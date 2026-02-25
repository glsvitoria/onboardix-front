import { ACCESS_TOKEN } from '@/common/token'
import { NextRequest, NextResponse } from 'next/server'
import { decodeJwt } from 'jose'

export function proxy(request: NextRequest) {
	const token = request.cookies.get(ACCESS_TOKEN)?.value
	const { pathname } = request.nextUrl

	// 1. Usuário não autenticado tentando acessar áreas restritas
	if (!token) {
		if (
			pathname.startsWith('/dashboard') ||
			pathname.startsWith('/onboarding')
		) {
			const response = NextResponse.redirect(new URL('/auth', request.url))
			response.cookies.delete(ACCESS_TOKEN)
			return response
		}
		return NextResponse.next()
	}

	// Se chegou aqui, o token existe. Vamos decodificar a role.
	const payload = decodeJwt(token) as { role: string }
	const isMember = payload.role === 'MEMBER'

	// 2. Redirecionamento de páginas de Auth (se já logado, manda pro lugar certo)
	if (pathname === '/auth' || pathname === '/register') {
		const destination = isMember ? '/onboarding' : '/dashboard'
		return NextResponse.redirect(new URL(destination, request.url))
	}

	// 3. Proteção: Member tentando acessar Dashboard
	if (isMember && pathname.startsWith('/dashboard')) {
		return NextResponse.redirect(new URL('/onboarding', request.url))
	}

	// 4. Proteção: Admin/Owner tentando acessar Onboarding de colaborador
	if (!isMember && pathname.startsWith('/onboarding')) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	return NextResponse.next()
}

export const config = {
	// Atualizei o matcher para incluir a nova rota de onboarding
	matcher: ['/dashboard/:path*', '/onboarding/:path*', '/auth', '/register'],
}
