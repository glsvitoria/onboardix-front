import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'
import { UserTaskWithTask } from '@/types/user-task'

interface MyProgressEmployeesResponse {
	percentage: number
	total: number
	completed: number
	userTasks: UserTaskWithTask[]
}

interface MyProgressEmployeesProps {
	options?: RequestOptionsService
}

export async function myProgressEmployeesService(
	props: MyProgressEmployeesProps,
): Promise<MyProgressEmployeesResponse> {
	const { options } = props

	try {
		const response = await api.get<MyProgressEmployeesResponse>(
			`/employees/my-progress`,
			options,
		)

		return response
	} catch (error: any) {
		throw new ServiceError(
			error?.message || error?.message,
			error?.status || 500,
		)
	}
}
