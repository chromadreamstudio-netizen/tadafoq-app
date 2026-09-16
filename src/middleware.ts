import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['ar', 'en']
const defaultLocale = 'ar'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // التحقق مما إذا كان الرابط يحتوي بالفعل على لغة
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // إذا لم يحتوي الرابط على لغة، يتم تحويله للغة الافتراضية (العربية)
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // استثناء ملفات النظام والصور من الموجه
  matcher: [
    '/((?!_next|favicon.ico|api|.*\\.).*)',
  ],
}