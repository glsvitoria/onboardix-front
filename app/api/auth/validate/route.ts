import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/common/token'
import { getCookieData } from '@/lib/get-cookie-data'
import { validateAuthService } from '@/services/auth/validate'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

	const cookieStore = await cookies()
	const accessToken = getCookieData(cookieStore.get(ACCESS_TOKEN)?.value)

	if (!accessToken) {
		return logoutAndRedirect(request)
	}

	try {
		const data = await validateAuthService({})

		const response = NextResponse.redirect(new URL(callbackUrl, request.url))

		const cookieOptions = {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			sameSite: 'lax' as const,
		}

		response.cookies.set(
			ACCESS_TOKEN,
			JSON.stringify({
				value: data.accessToken,
				expiresAt: data.accessTokenExpiresAt,
			}),
			{
				...cookieOptions,
				expires: new Date(data.accessTokenExpiresAt),
			},
		)

		response.cookies.set(
			REFRESH_TOKEN,
			JSON.stringify({
				value: data.refreshToken,
				expiresAt: data.refreshTokenExpiresAt,
			}),
			{
				...cookieOptions,
				expires: new Date(data.refreshTokenExpiresAt),
			},
		)

		return response
	} catch (error) {
		console.error('Access Token Error:', error)
		return logoutAndRedirect(request)
	}
}

function logoutAndRedirect(request: NextRequest) {
	const response = NextResponse.redirect(new URL('/auth', request.url))
	response.cookies.delete(ACCESS_TOKEN)
	response.cookies.delete(REFRESH_TOKEN)
	return response
}
