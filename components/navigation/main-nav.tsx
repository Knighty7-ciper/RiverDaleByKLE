"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, Sun, User, ArrowUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navLinks = [
    { href: "/destinations", label: "Destinations" },
    { href: "/hotels", label: "Hotels" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/support", label: "Support & FAQ" },
  ]

  return (
    <>
      {/* Main Navigation */}
      <nav
        className="sticky top-0 z-50 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-amber-950/20 backdrop-blur-md border-b border-amber-200/40 dark:border-amber-800/40 shadow-sm"
        style={{
          backgroundImage: `url('/kenyan-art-pattern.png'), linear-gradient(90deg, rgb(255 251 235) 0%, rgb(255 247 237) 50%, rgb(255 251 235) 100%)`,
          backgroundSize: "120px 120px, cover",
          backgroundRepeat: "repeat, no-repeat",
          backgroundBlendMode: "soft-light",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="font-heading text-2xl font-bold text-amber-800 dark:text-amber-200 drop-shadow-sm"
              >
                Riverdale
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-amber-900 dark:text-amber-100 hover:text-amber-700 dark:hover:text-amber-300 transition-colors text-sm font-medium px-3 py-2 rounded-md hover:bg-amber-100/60 dark:hover:bg-amber-900/30 backdrop-blur-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 p-0 hover:bg-amber-100/60 dark:hover:bg-amber-900/30 text-amber-800 dark:text-amber-200"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              <Link href="/profile">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-9 h-9 p-0 hover:bg-amber-100/60 dark:hover:bg-amber-900/30 text-amber-800 dark:text-amber-200"
                >
                  <User className="h-4 w-4" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>

              <Link href="/booking">
                <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-md hidden sm:inline-flex font-medium">
                  Book Now
                </Button>
              </Link>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-9 h-9 p-0 hover:bg-amber-100/60 dark:hover:bg-amber-900/30 text-amber-800 dark:text-amber-200"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-[400px] bg-white dark:bg-gray-900 border-l border-amber-200 dark:border-amber-800"
                >
                  <div className="flex flex-col space-y-4 mt-8">
                    <Link
                      href="/"
                      className="font-heading text-xl font-bold text-amber-800 dark:text-amber-200 mb-4 pb-4 border-b border-amber-200 dark:border-amber-700"
                    >
                      Riverdale
                    </Link>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-gray-800 dark:text-gray-200 hover:text-amber-700 dark:hover:text-amber-300 transition-colors py-3 px-4 text-lg rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 border-l-4 border-transparent hover:border-amber-600 font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="pt-6 border-t border-amber-200 dark:border-amber-700 space-y-3">
                      <Link href="/profile" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full mb-2 bg-white dark:bg-gray-800 border-amber-300 hover:bg-amber-50 dark:border-amber-700 dark:hover:bg-amber-900/20 text-gray-800 dark:text-gray-200 hover:text-amber-700 dark:hover:text-amber-300"
                        >
                          My Profile
                        </Button>
                      </Link>
                      <Link href="/booking" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-md font-medium">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          size="sm"
        >
          <ArrowUp className="h-5 w-5" />
          <span className="sr-only">Back to top</span>
        </Button>
      )}
    </>
  )
}
