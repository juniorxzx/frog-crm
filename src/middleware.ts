import { jwtDecode } from 'jwt-decode'
import { NextRequest, NextResponse } from 'next/server'

const publicRouters = [
  {
    path: '/sign-in',
    whenAuthenticated: 'redirect',
  },
  {
    path: '/reset-password',
    whenAuthenticated: 'redirect',
  },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/sign-in'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRouters.find(route => route.path === path)

  const authToken = request.cookies.get('token')?.value

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED
    return NextResponse.redirect(redirectUrl)
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = '/'
    return NextResponse.redirect(redirectUrl)
  }

  if (authToken) {
    try {
      const decodedToken: { exp: number } = jwtDecode(authToken)

      const currentTime = Date.now() / 1000
      const isExpired = decodedToken.exp < currentTime

      if (isExpired) {
        request.cookies.delete('token')
      }

      if (isExpired) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
