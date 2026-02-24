import { ACCESS_TOKEN } from '@/common/token'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const cookieStore = await cookies()

	cookieStore.delete(ACCESS_TOKEN)

	const loginUrl = new URL('/login', request.url)
	loginUrl.searchParams.set('session', 'expired')

	return NextResponse.redirect(loginUrl)
}
