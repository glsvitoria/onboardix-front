import { AuthenticatedUser } from '@/types/authenticated-user'
import { UserWithOrganization } from '@/types/user'
import { ACCESS_TOKEN } from '@/common/token'
import { cookies } from 'next/headers'

export async function getSession(): Promise<AuthenticatedUser | null> {
	const cookieStore = await cookies()
	const token = cookieStore.get(ACCESS_TOKEN)?.value

	if (!token) return null

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			next: { revalidate: 3600 },
		})

		if (!response.ok) return null

		const user: UserWithOrganization = await response.json()

		return {
			user,
			token,
		}
	} catch {
		return null
	}
}
