import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'
import { User } from '@/types/user'

interface LoginAuthResponse {
	accessToken: string
  accessTokenExpiresAt: Date
	refreshToken: string
  refreshTokenExpiresAt: Date
  user: User
}

interface LoginAuthProps {
	body: {
		email: string
		password: string
	}
	options?: RequestOptionsService
}

export async function loginAuthService(
	props: LoginAuthProps
): Promise<LoginAuthResponse> {
	const { body, options } = props

	try {
		const response = await api.post<LoginAuthResponse>(
			'/auth/login',
			body,
			options
		)

		return response
	} catch (error: any) {
		throw new ServiceError(
			error?.response?.data?.message || error?.message,
			error?.response?.status || 500
		)
	}
}
