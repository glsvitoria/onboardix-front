import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface UpdateProfileUsersResponse {
	message: string
}

interface UpdateProfileUsersProps {
	body: {
		fullName?: string
		email?: string
	}
	options?: RequestOptionsService
}

export async function updateProfileUsersService(
	props: UpdateProfileUsersProps,
): Promise<UpdateProfileUsersResponse> {
	const { body, options } = props
	try {
		const response = await api.put<UpdateProfileUsersResponse>(
			'/users/profile',
			body,
			options,
		)

		return response
	} catch (error: any) {
		throw new ServiceError(
			error?.response?.data?.message || error?.message,
			error?.response?.status || 500,
		)
	}
}
