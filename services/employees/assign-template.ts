import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface AssignTemplateEmployeesResponse {
	message: string
}

interface AssignTemplateEmployeesProps {
	userId: string
	templateId: string
	options?: RequestOptionsService
}

export async function assignTemplateEmployeesService(
	props: AssignTemplateEmployeesProps
): Promise<AssignTemplateEmployeesResponse> {
	const { userId, templateId, options } = props
	try {
		const response = await api.post<AssignTemplateEmployeesResponse>(
			`/${userId}/assign/${templateId}`,
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
