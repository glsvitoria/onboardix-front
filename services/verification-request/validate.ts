import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface ValidateVerificationRequestResponse {
	message: string
	token: string
}

interface ValidateVerificationRequestProps {
	body: {
		identifier: string
		code: string
	}
	options?: RequestOptionsService
}

export async function validateVerificationRequestService(
	props: ValidateVerificationRequestProps,
): Promise<ValidateVerificationRequestResponse> {
	const { body, options } = props

	try {
		const response = await api.post<ValidateVerificationRequestResponse>(
			'/verification-request/validate',
			{
				...body,
				type: 'PASSWORD_RESET',
			},
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
