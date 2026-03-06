import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface CreateInvitationsResponse {
	message: string
}

interface CreateInvitationsProps {
	body: {
		email: string
	}
	options?: RequestOptionsService
}

export async function createInvitationsService(
	props: CreateInvitationsProps,
): Promise<CreateInvitationsResponse> {
	const { body, options } = props
	try {
		const response = await api.post<CreateInvitationsResponse>(
			'/invitations',
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
