import { NextRequest, NextResponse } from "next/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

/**
 * Supportel locales list
 */
let locales = ["en", "fa"]

/**
 * Extract selected locales with client through request headers
 * @param request http request object
 * @returns 
 */
function getLocale(request: NextRequest) {
  let languages = new Negotiator({ headers: request.headers }).languages()
  let defaultLocale = "en"

  if (languages.length == 1 && languages[0] == "*") return defaultLocale

  return match(languages, locales, defaultLocale) // -> 'en-US'
}

/**
 * Proxy implementation
 * @param request http request object
 * @returns
 */
export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
}
