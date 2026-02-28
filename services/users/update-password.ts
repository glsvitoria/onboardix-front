import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface UpdatePasswordUsersResponse {
	access_token: string
}

interface UpdatePasswordUsersProps {
	body: {
		currentPassword: string
		newPassword: string
		confirmPassword: string
	}
	options?: RequestOptionsService
}

export async function updatePasswordUsersService(
	props: UpdatePasswordUsersProps
): Promise<UpdatePasswordUsersResponse> {
	const { body, options } = props

	try {
		const response = await api.put<UpdatePasswordUsersResponse>(
			'/users/profile/password',
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
