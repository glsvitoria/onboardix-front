import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { Invitation } from '@/types/invitation'
import { ServiceError } from '@/types/service-error'

interface ListInvitationsResponse {
	invitations: Invitation[]
	total: number
}

interface ListInvitationsReturn {
	items: Invitation[]
	total: number
}

interface ListInvitationsProps {
	params: {
		init: number
		limit: number
	}
	options?: RequestOptionsService
}

export async function listInvitationsService(
	props: ListInvitationsProps,
): Promise<ListInvitationsReturn> {
	const { params, options } = props
	try {
		const { invitations, total } = await api.get<ListInvitationsResponse>(
			'/invitations',
			{
				params,
				...options,
			},
		)

		return {
			items: invitations,
			total,
		}
	} catch (error: any) {
		throw new ServiceError(
			error?.message || error?.message,
			error?.status || 500,
		)
	}
}
