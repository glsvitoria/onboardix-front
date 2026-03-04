import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface EmployeesResumeDashboardResponse {
	totalEmployees: number
	averageProgress: number
	employees: {
		id: string
		name: string
		email: string
		progress: string
		progressValue: number
		status: string
	}[]
}

interface EmployeesResumeDashboardProps extends RequestOptionsService {
	params: {
		init: number
		limit: number
	}
	options?: RequestOptionsService
}

export async function employeesResumeDashboardService(
	props: EmployeesResumeDashboardProps
): Promise<EmployeesResumeDashboardResponse> {
	const { params, options } = props

	try {
		const response = await api.get<EmployeesResumeDashboardResponse>(
			'/dashboard/employees-resume',
			{
				params,
				...options,
			}
		)

		return response
	} catch (error: any) {
		throw new ServiceError(
			error?.response?.data?.message || error?.message,
			error?.response?.status || 500
		)
	}
}
