"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let cancelled = false
    const check = async () => {
      try {
        const { data } = await supabase.auth.getUser()
        const user = data?.user
        if (!user && pathname !== "/admin") {
          router.replace("/admin")
          return
        }
      } finally {
        if (!cancelled) setChecking(false)
      }
    }
    check()
    return () => {
      cancelled = true
    }
  }, [router, supabase, pathname])

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-300">Checking admin access…</div>
      </div>
    )
  }

  return <>{children}</>
}
