import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface ToggleUserTasksResponse {
	message: string
}

interface ToggleUserTasksProps {
	params: {
		userTaskId: string
	}
	body: {
		completed: boolean
	}
	options?: RequestOptionsService
}

export async function toggleUserTasksService(
	props: ToggleUserTasksProps
): Promise<ToggleUserTasksResponse> {
	const { params, body, options } = props

	try {
		const response = await api.patch<ToggleUserTasksResponse>(
			`/user-tasks/${params.userTaskId}/toggle`,
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
