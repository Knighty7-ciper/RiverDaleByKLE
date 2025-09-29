import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname === "/admin" || !pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Simple auth check: look for Supabase auth cookies. If missing, redirect to /admin login
  const hasAccessToken = req.cookies.has("sb-access-token") || req.cookies.get("sb:token")
  if (!hasAccessToken) {
    const url = req.nextUrl.clone()
    url.pathname = "/admin"
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
