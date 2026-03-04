import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface AcceptInvitationsResponse {
	message: string
}

interface AcceptInvitationsProps {
	body: {
		token: string
		fullName: string
		password: string
		confirmPassword: string
	}
	options?: RequestOptionsService
}

export async function acceptInvitationsService(
	props: AcceptInvitationsProps
): Promise<AcceptInvitationsResponse> {
	const { body, options } = props
	try {
		const response = await api.post<AcceptInvitationsResponse>(
			'/invitations/accept',
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
