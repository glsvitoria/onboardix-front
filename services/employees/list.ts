import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { Employee } from '@/types/employee'

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
			}
		)
		return {
			items: users,
			total,
		}
	} catch (error) {
		return { items: [], total: 0 }
	}
}
