import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface ValidateInvitationsProps {
	params: {
		token: string
	}
	options?: RequestOptionsService
}

export async function validateInvitationsService(
	props: ValidateInvitationsProps,
): Promise<void> {
	const { params, options } = props
	try {
		await api.get('/invitations/validate', {
			params,
			...options,
		})
	} catch (error: any) {
		throw new ServiceError(
			error?.message || error?.message,
			error?.status || 500,
		)
	}
}
