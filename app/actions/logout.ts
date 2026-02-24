'use server'

import { ACCESS_TOKEN } from '@/common/token'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logoutAction() {
	const cookieStore = await cookies()
	cookieStore.delete(ACCESS_TOKEN)
	redirect('/login')
}
