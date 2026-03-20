import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface CreateVerificationRequestResponse {
	message: string
}

interface CreateVerificationRequestProps {
	body: {
		identifier: string
	}
	options?: RequestOptionsService
}

export async function createVerificationRequestService(
	props: CreateVerificationRequestProps,
): Promise<CreateVerificationRequestResponse> {
	const { body, options } = props

	try {
		const response = await api.post<CreateVerificationRequestResponse>(
			'/verification-request',
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
