import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { Invitation } from '@/types/invitation'

interface ListInvitationsResponse {
	invitations: Invitation[]
	total: number
}

interface ListInvitationsReturn {
	items: Invitation[]
	total: number
}

interface ListInvitationsProps {
	init: number
	limit: number
	options?: RequestOptionsService
}

export async function listInvitationsService(
	props: ListInvitationsProps
): Promise<ListInvitationsReturn> {
	const { init, limit } = props
	try {
		const { invitations, total } = await api.get<ListInvitationsResponse>(
			'/invitations',
			{
				params: {
					init: init * limit,
					limit,
				},
				...props.options,
			}
		)

		return {
			items: invitations,
			total,
		}
	} catch (error) {
		return { items: [], total: 0 }
	}
}
