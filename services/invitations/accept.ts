import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { Invitation } from '@/types/invitation'

interface AcceptInvitationsResponse {
	invitations: Invitation[]
	total: number
}

interface AcceptInvitationsReturn {
	items: Invitation[]
	total: number
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
): Promise<AcceptInvitationsReturn> {
	const { body, options } = props
	try {
		const { invitations, total } = await api.post<AcceptInvitationsResponse>(
			'/invitations',
			body,
			options
		)

		return {
			items: invitations,
			total,
		}
	} catch (error) {
		return { items: [], total: 0 }
	}
}
