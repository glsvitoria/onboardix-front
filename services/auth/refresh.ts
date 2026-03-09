import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface RefreshAuthResponse {
	accessToken: string
	accessTokenExpiresAt: string
	refreshToken: string
	refreshTokenExpiresAt: string
}

interface RefreshAuthProps {
	options?: RequestOptionsService
}

export async function refreshAuthService(
	props: RefreshAuthProps,
): Promise<RefreshAuthResponse> {
	const { options } = props

  try {
		const response = await api.post<RefreshAuthResponse>('/auth/refresh', {}, options)

		return response
	} catch (error: any) {
    console.error('Error refreshing auth:', error)
		throw new ServiceError(
			error?.message || error?.message,
			error?.status || 500,
		)
	}
}
