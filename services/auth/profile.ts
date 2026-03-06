import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'
import { UserWithOrganization } from '@/types/user'

interface ProfileAuthResponse extends UserWithOrganization {}

interface ProfileAuthProps {
	options?: RequestOptionsService
}

export async function profileAuthService(
	props: ProfileAuthProps,
): Promise<ProfileAuthResponse> {
	const { options } = props
	try {
		const response = await api.get<ProfileAuthResponse>('/auth/me', options)

		return response
	} catch (error: any) {
		throw new ServiceError(
			error?.message || error?.message,
			error?.status || 500,
		)
	}
}
