import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface LoginAuthResponse {
	access_token: string
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
