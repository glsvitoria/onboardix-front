import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface CreateLeadsResponse {
	message: string
}

interface CreateLeadsProps {
	body: {
		email: string
	}
	options?: RequestOptionsService
}

export async function createLeadsService(
	props: CreateLeadsProps
): Promise<CreateLeadsResponse> {
	const { body, options } = props

	try {
		const response = await api.post<CreateLeadsResponse>(
			'/leads/register',
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
