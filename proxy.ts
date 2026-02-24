import { ACCESS_TOKEN } from '@/common/token'
import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
	const token = request.cookies.get(ACCESS_TOKEN)?.value
	const { pathname } = request.nextUrl

	if (token && (pathname === '/login' || pathname === '/register')) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	if (!token && pathname.startsWith('/dashboard')) {
		const response = NextResponse.redirect(new URL('/login', request.url))

		// Garantimos que qualquer rastro de cookie antigo seja removido na resposta
		response.cookies.delete(ACCESS_TOKEN)
		return response
	}

	return NextResponse.next()
}

export const config = {
	// Adicionei a '/' para cobrir a home caso necessário
	matcher: ['/dashboard/:path*', '/login', '/register'],
}
