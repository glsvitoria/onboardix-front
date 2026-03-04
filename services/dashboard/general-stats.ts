import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface GeneralStatsDashboardResponse {
	cards: {
		totalEmployees: number
		avgProgress: string
		completionRate: number
	}
	charts: {
		taskDistribution: { name: string; value: number }[]
		history: { date: Date; count: number }[]
	}
}

interface GeneralStatsDashboardProps extends RequestOptionsService {
	options?: RequestOptionsService
}

export async function generalStatsDashboardService(
	props: GeneralStatsDashboardProps
): Promise<GeneralStatsDashboardResponse> {
	const { options } = props

	try {
		const response = await api.get<GeneralStatsDashboardResponse>(
			'/dashboard/general-stats',
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
