import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface SearchDashboardResponse {
	results: {
		id: string
		name: string
		type: 'USER' | 'TRACK'
	}[]
}

interface SearchDashboardProps extends RequestOptionsService {
	params: {
		q: string
	}
	options?: RequestOptionsService
}

export async function searchDashboardService(
	props: SearchDashboardProps,
): Promise<SearchDashboardResponse> {
	const { params, options } = props

	try {
		const response = await api.get<SearchDashboardResponse>(
			'/dashboard/search',
			{
				params,
				...options,
			},
		)

		return response
	} catch (error: any) {
		throw new ServiceError(
			error?.message || error?.message,
			error?.status || 500,
		)
	}
}
