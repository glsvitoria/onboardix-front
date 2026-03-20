import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'
import { User } from '@/types/user'

interface ResetPasswordAuthResponse {
	message: string
}

interface ResetPasswordAuthProps {
	body: {
		newPassword: string
		token: string
	}
	options?: RequestOptionsService
}

export async function resetPasswordAuthService(
	props: ResetPasswordAuthProps,
): Promise<ResetPasswordAuthResponse> {
	const { body, options } = props

	try {
		const response = await api.post<ResetPasswordAuthResponse>(
			'/verification-request/reset-password',
			body,
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
