import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/common/token'
import { NextRequest, NextResponse } from 'next/server'
import { decodeJwt } from 'jose'
import { isBefore } from 'date-fns'
import { getCookieData } from './lib/get-cookie-data'

export async function proxy(request: NextRequest) {
	const accessToken = getCookieData(request.cookies.get(ACCESS_TOKEN)?.value)
	const refreshToken = getCookieData(request.cookies.get(REFRESH_TOKEN)?.value)

	const { pathname } = request.nextUrl

	if (!accessToken && !refreshToken) {
		if (
			pathname.startsWith('/dashboard') ||
			pathname.startsWith('/onboarding')
		) {
			return redirectToAuth(request)
		}
		return NextResponse.next()
	}

	if (!accessToken) {
		if (
			pathname.startsWith('/dashboard') ||
			pathname.startsWith('/onboarding')
		) {
			return redirectToRefresh(request, pathname)
		}
		return NextResponse.next()
	}

	if (!refreshToken) {
		if (
			pathname.startsWith('/dashboard') ||
			pathname.startsWith('/onboarding')
		) {
			return redirectToValidate(request, pathname)
		}
		return NextResponse.next()
	}

	if (isBefore(new Date(accessToken.expiresAt), new Date())) {
		return redirectToRefresh(request, pathname)
	}

	try {
		const payload = decodeJwt(accessToken.value) as { role: string }
		const isMember = payload.role === 'MEMBER'

		if (pathname === '/auth' || pathname === '/register') {
			const destination = isMember ? '/onboarding' : '/dashboard'
			return NextResponse.redirect(new URL(destination, request.url))
		}

		if (isMember && pathname.startsWith('/dashboard')) {
			return NextResponse.redirect(new URL('/onboarding', request.url))
		}

		if (!isMember && pathname.startsWith('/onboarding')) {
			return NextResponse.redirect(new URL('/dashboard', request.url))
		}
	} catch (error) {
		if (refreshToken) {
			return redirectToRefresh(request, pathname)
		}

		if (accessToken) {
			return redirectToValidate(request, pathname)
		}

		return redirectToAuth(request)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/onboarding/:path*', '/auth', '/register'],
}

function redirectToAuth(request: NextRequest) {
	const response = NextResponse.redirect(new URL('/auth', request.url))
	response.cookies.delete(ACCESS_TOKEN)
	response.cookies.delete(REFRESH_TOKEN)
	return response
}

function redirectToRefresh(request: NextRequest, pathname: string) {
	const url = new URL('/api/auth/refresh', request.url)
	url.searchParams.set('callbackUrl', pathname)
	return NextResponse.redirect(url)
}

function redirectToValidate(request: NextRequest, pathname: string) {
	const url = new URL('/api/auth/validate', request.url)
	url.searchParams.set('callbackUrl', pathname)
	return NextResponse.redirect(url)
}
