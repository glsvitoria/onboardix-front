import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface AssignTemplateEmployeesResponse {
	message: string
}

interface AssignTemplateEmployeesProps {
	params: {
		userId: string
		templateId: string
	}
	options?: RequestOptionsService
}

export async function assignTemplateEmployeesService(
	props: AssignTemplateEmployeesProps,
): Promise<AssignTemplateEmployeesResponse> {
	const { params, options } = props
	try {
		const response = await api.post<AssignTemplateEmployeesResponse>(
			`/employees/${params.userId}/assign/${params.templateId}`,
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
