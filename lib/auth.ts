import { AuthenticatedUser } from '@/types/authenticated-user'
import { ACCESS_TOKEN } from '@/common/token'
import { cookies } from 'next/headers'
import { profileAuthService } from '@/services/auth/profile'
import { redirect } from 'next/navigation'

export async function getSession(): Promise<AuthenticatedUser | null> {
	const cookieStore = await cookies()
	const token = cookieStore.get(ACCESS_TOKEN)?.value

	try {
		if (!token) throw new Error()

		const response = await profileAuthService({
			options: {
				cache: 'no-store',
			},
		})

		return {
			user: response,
			token,
		}
	} catch {
		redirect('/api/auth/logout')
	}
}
