import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/common/token'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const cookieStore = await cookies()

	cookieStore.delete(ACCESS_TOKEN)
	cookieStore.delete(REFRESH_TOKEN)

	const loginUrl = new URL('/auth', request.url)
	loginUrl.searchParams.set('session', 'expired')

	return NextResponse.redirect(loginUrl)
}
