import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'
import { TemplateWithTasks } from '@/types/template'

interface ShowTemplatesResponse extends TemplateWithTasks {}

interface ShowTemplatesProps {
	params: {
		templateId: string
	}
	options?: RequestOptionsService
}

export async function showTemplatesService(
	props: ShowTemplatesProps
): Promise<ShowTemplatesResponse> {
	const { params, options } = props
	try {
		const response = await api.get<ShowTemplatesResponse>(
			`/templates/${params.templateId}`,
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
