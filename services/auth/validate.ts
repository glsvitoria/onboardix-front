import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'
import { User } from '@/types/user'

interface ValidateAuthResponse {
	accessToken: string
	accessTokenExpiresAt: string
	refreshToken: string
	refreshTokenExpiresAt: string
	user: User
}

interface ValidateAuthProps {
	options?: RequestOptionsService
}

export async function validateAuthService(
	props: ValidateAuthProps,
): Promise<ValidateAuthResponse> {
	const {  options } = props

	try {
		const response = await api.post<ValidateAuthResponse>(
			'/auth/validate',
			{},
			options,
		)

		return response
	} catch (error: any) {
		throw new ServiceError(
			error?.message || error?.message,
			error?.status || 500,
		)
	}
}
