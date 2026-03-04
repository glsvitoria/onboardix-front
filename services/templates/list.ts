import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'
import { TemplateWithTasksCount } from '@/types/template'

interface ListTemplatesResponse {
	templates: TemplateWithTasksCount[]
	total: number
}

interface ListTemplatesReturn {
	items: TemplateWithTasksCount[]
	total: number
}

interface ListTemplatesProps {
	init: number
	limit: number
	options?: RequestOptionsService
}

export async function listTemplatesService(
	props: ListTemplatesProps
): Promise<ListTemplatesReturn> {
	const { init, limit, options } = props
	try {
		const { total, templates } = await api.get<ListTemplatesResponse>(
			'/templates',
			{
				params: {
					init: init * limit,
					limit,
				},
				...options,
			}
		)

		return {
			items: templates,
			total,
		}
	} catch (error: any) {
		throw new ServiceError(
			error?.response?.data?.message || error?.message,
			error?.response?.status || 500
		)
	}
}
