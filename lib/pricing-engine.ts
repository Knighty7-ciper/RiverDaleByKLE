export interface PricingRule {
  id: string
  name: string
  type: "seasonal" | "group" | "age" | "promotion" | "early_bird"
  active: boolean
  conditions: {
    minTravelers?: number
    maxTravelers?: number
    ageGroup?: "adult" | "child" | "infant"
    season?: "peak" | "off_peak" | "shoulder"
    daysInAdvance?: number
    destinations?: string[]
    dateRange?: {
      start: string
      end: string
    }
  }
  discount: {
    type: "percentage" | "fixed_amount"
    value: number
    maxDiscount?: number
  }
  priority: number
}

export interface PricingCalculation {
  basePrice: number
  adultPrice: number
  childPrice: number
  infantPrice: number
  subtotal: number
  discounts: Array<{
    name: string
    amount: number
    type: string
  }>
  totalDiscount: number
  taxes: number
  processingFee: number
  total: number
  breakdown: {
    adults: { count: number; unitPrice: number; total: number }
    children: { count: number; unitPrice: number; total: number }
    infants: { count: number; unitPrice: number; total: number }
  }
}

class PricingEngine {
  private static instance: PricingEngine

  static getInstance(): PricingEngine {
    if (!PricingEngine.instance) {
      PricingEngine.instance = new PricingEngine()
    }
    return PricingEngine.instance
  }

  private getDefaultPricingRules(): PricingRule[] {
    return [
      {
        id: "child-discount",
        name: "Children Discount (2-17 years)",
        type: "age",
        active: true,
        conditions: { ageGroup: "child" },
        discount: { type: "percentage", value: 30 },
        priority: 1,
      },
      {
        id: "infant-discount",
        name: "Infant Discount (0-2 years)",
        type: "age",
        active: true,
        conditions: { ageGroup: "infant" },
        discount: { type: "percentage", value: 90 },
        priority: 1,
      },
      {
        id: "peak-season",
        name: "Peak Season Surcharge",
        type: "seasonal",
        active: true,
        conditions: {
          season: "peak",
          dateRange: {
            start: "2024-07-01",
            end: "2024-10-31",
          },
        },
        discount: { type: "percentage", value: -40 }, // Negative = surcharge
        priority: 2,
      },
      {
        id: "off-peak-discount",
        name: "Off-Peak Season Discount",
        type: "seasonal",
        active: true,
        conditions: {
          season: "off_peak",
          dateRange: {
            start: "2024-04-01",
            end: "2024-06-30",
          },
        },
        discount: { type: "percentage", value: 20 },
        priority: 2,
      },
      {
        id: "large-group",
        name: "Large Group Discount (8+ travelers)",
        type: "group",
        active: true,
        conditions: { minTravelers: 8 },
        discount: { type: "percentage", value: 15, maxDiscount: 50000 },
        priority: 3,
      },
      {
        id: "family-package",
        name: "Family Package (2 adults + 2+ children)",
        type: "group",
        active: true,
        conditions: { minTravelers: 4 },
        discount: { type: "percentage", value: 10 },
        priority: 3,
      },
      {
        id: "early-bird",
        name: "Early Bird Discount (60+ days advance)",
        type: "early_bird",
        active: true,
        conditions: { daysInAdvance: 60 },
        discount: { type: "percentage", value: 12 },
        priority: 4,
      },
    ]
  }

  getPricingRules(): PricingRule[] {
    if (typeof window === "undefined") {
      return this.getDefaultPricingRules()
    }

    const stored = localStorage.getItem("pricingRules")
    return stored ? JSON.parse(stored) : this.getDefaultPricingRules()
  }

  savePricingRules(rules: PricingRule[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("pricingRules", JSON.stringify(rules))
    }
  }

  calculatePrice(params: {
    basePrice: number
    adults: number
    children: number
    infants?: number
    travelDate?: Date
    bookingDate?: Date
    destination?: string
    promoCode?: string
  }): PricingCalculation {
    const { basePrice, adults, children, infants = 0, travelDate, bookingDate, destination } = params

    const rules = this.getPricingRules().filter((rule) => rule.active)
    const appliedDiscounts: Array<{ name: string; amount: number; type: string }> = []

    // Base calculations
    const adultPrice = basePrice
    let childPrice = basePrice
    let infantPrice = basePrice

    // Apply age-based discounts
    const childRule = rules.find((r) => r.type === "age" && r.conditions.ageGroup === "child")
    if (childRule) {
      const discount =
        childRule.discount.type === "percentage"
          ? basePrice * (childRule.discount.value / 100)
          : childRule.discount.value
      childPrice = Math.max(0, basePrice - discount)
    }

    const infantRule = rules.find((r) => r.type === "age" && r.conditions.ageGroup === "infant")
    if (infantRule) {
      const discount =
        infantRule.discount.type === "percentage"
          ? basePrice * (infantRule.discount.value / 100)
          : infantRule.discount.value
      infantPrice = Math.max(0, basePrice - discount)
    }

    // Calculate subtotal
    const subtotal = adults * adultPrice + children * childPrice + infants * infantPrice
    let totalDiscount = 0

    // Apply seasonal pricing
    if (travelDate) {
      const seasonalRule = this.getSeasonalRule(travelDate, rules)
      if (seasonalRule) {
        const discount =
          seasonalRule.discount.type === "percentage"
            ? subtotal * (Math.abs(seasonalRule.discount.value) / 100)
            : Math.abs(seasonalRule.discount.value)

        if (seasonalRule.discount.value < 0) {
          // Surcharge
          appliedDiscounts.push({
            name: seasonalRule.name,
            amount: -discount,
            type: "surcharge",
          })
          totalDiscount -= discount
        } else {
          // Discount
          appliedDiscounts.push({
            name: seasonalRule.name,
            amount: discount,
            type: "discount",
          })
          totalDiscount += discount
        }
      }
    }

    // Apply group discounts
    const totalTravelers = adults + children + infants
    const groupRules = rules.filter((r) => r.type === "group")

    for (const rule of groupRules) {
      if (rule.conditions.minTravelers && totalTravelers >= rule.conditions.minTravelers) {
        // Check family package conditions
        if (rule.id === "family-package" && adults >= 2 && children >= 2) {
          const discount =
            rule.discount.type === "percentage" ? subtotal * (rule.discount.value / 100) : rule.discount.value
          const finalDiscount = rule.discount.maxDiscount ? Math.min(discount, rule.discount.maxDiscount) : discount

          appliedDiscounts.push({
            name: rule.name,
            amount: finalDiscount,
            type: "group",
          })
          totalDiscount += finalDiscount
        } else if (rule.id === "large-group") {
          const discount =
            rule.discount.type === "percentage" ? subtotal * (rule.discount.value / 100) : rule.discount.value
          const finalDiscount = rule.discount.maxDiscount ? Math.min(discount, rule.discount.maxDiscount) : discount

          appliedDiscounts.push({
            name: rule.name,
            amount: finalDiscount,
            type: "group",
          })
          totalDiscount += finalDiscount
        }
      }
    }

    // Apply early bird discount
    if (travelDate && bookingDate) {
      const daysInAdvance = Math.floor((travelDate.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24))
      const earlyBirdRule = rules.find(
        (r) => r.type === "early_bird" && r.conditions.daysInAdvance && daysInAdvance >= r.conditions.daysInAdvance,
      )

      if (earlyBirdRule) {
        const discount =
          earlyBirdRule.discount.type === "percentage"
            ? subtotal * (earlyBirdRule.discount.value / 100)
            : earlyBirdRule.discount.value

        appliedDiscounts.push({
          name: earlyBirdRule.name,
          amount: discount,
          type: "early_bird",
        })
        totalDiscount += discount
      }
    }

    // Calculate final amounts
    const discountedSubtotal = Math.max(0, subtotal - totalDiscount)
    const taxes = discountedSubtotal * 0.16 // 16% VAT
    const processingFee = 2500 // KES 2,500 processing fee
    const total = discountedSubtotal + taxes + processingFee

    return {
      basePrice,
      adultPrice,
      childPrice,
      infantPrice,
      subtotal,
      discounts: appliedDiscounts,
      totalDiscount,
      taxes,
      processingFee,
      total,
      breakdown: {
        adults: { count: adults, unitPrice: adultPrice, total: adults * adultPrice },
        children: { count: children, unitPrice: childPrice, total: children * childPrice },
        infants: { count: infants, unitPrice: infantPrice, total: infants * infantPrice },
      },
    }
  }

  private getSeasonalRule(travelDate: Date, rules: PricingRule[]): PricingRule | null {
    const seasonalRules = rules.filter((r) => r.type === "seasonal")

    for (const rule of seasonalRules) {
      if (rule.conditions.dateRange) {
        const startDate = new Date(rule.conditions.dateRange.start)
        const endDate = new Date(rule.conditions.dateRange.end)

        if (travelDate >= startDate && travelDate <= endDate) {
          return rule
        }
      }
    }

    return null
  }

  getSeason(date: Date): "peak" | "off_peak" | "shoulder" {
    const month = date.getMonth() + 1 // 1-12

    // Peak season: July-October (Great Migration), December-January (Holidays)
    if ((month >= 7 && month <= 10) || month === 12 || month === 1) {
      return "peak"
    }

    // Off-peak: April-June (Long rains recovery)
    if (month >= 4 && month <= 6) {
      return "off_peak"
    }

    // Shoulder: February-March, November
    return "shoulder"
  }
}

export { PricingEngine }
export default PricingEngine
