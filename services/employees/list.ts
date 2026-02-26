import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { Employee } from '@/types/employee'
import { ServiceError } from '@/types/service-error'

interface ListEmployeesResponse {
	users: Employee[]
	total: number
}

interface ListEmployeesReturn {
	items: Employee[]
	total: number
}

interface ListEmployeesProps {
	init: number
	limit: number
	options?: RequestOptionsService
}

export async function listEmployeesService(
	props: ListEmployeesProps
): Promise<ListEmployeesReturn> {
	const { init, limit } = props
	try {
		const { total, users } = await api.get<ListEmployeesResponse>(
			'/employees',
			{
				params: {
					init: init * limit,
					limit,
				},
				...props.options,
			}
		)

		return {
			items: users,
			total,
		}
	} catch (error: any) {
		throw new ServiceError(
			error?.response?.data?.message || error?.message,
			error?.response?.status || 500
		)
	}
}
