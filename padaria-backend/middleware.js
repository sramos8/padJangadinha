import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const url = request.nextUrl.clone()

  const protectedRoutes = [
    '/', 
    '/produtos',
    '/estoque',
    '/vendas',
    '/vendas-lista',
    '/itens-produzidos',
    '/usuarios'
  ]

  const isProtected = protectedRoutes.some(route => url.pathname.startsWith(route))

  if (isProtected && !token) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/produtos/:path*',
    '/estoque/:path*',
    '/vendas/:path*',
    '/vendas-lista/:path*',
    '/itens-produzidos/:path*',
    '/usuarios/:path*',
  ],
}
