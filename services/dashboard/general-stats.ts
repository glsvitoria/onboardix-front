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
		history: { date: string; count: number }[]
	}
}

interface GeneralStatsDashboardProps extends RequestOptionsService {
	options?: RequestOptionsService
}

export async function generalStatsDashboardService(
	props: GeneralStatsDashboardProps,
): Promise<GeneralStatsDashboardResponse> {
	const { options } = props

	try {
		const response = await api.get<GeneralStatsDashboardResponse>(
			'/dashboard/general-stats',
			options,
		)

		return response
	} catch (error: any) {
		throw new ServiceError(
			error?.message ||
				'Ocorreu um erro ao buscar o histórico de tarefas da última semana.',
			error?.status || 500,
		)
	}
}
