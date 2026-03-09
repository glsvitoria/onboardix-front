import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'
import { TemplateWithTasksCount } from '@/types/template'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

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
	props: ListTemplatesProps,
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
			},
		)

		return {
			items: templates,
			total,
		}
	} catch (error: any) {
    if (isRedirectError(error)) {
    throw error
  }

		throw new ServiceError(
			error?.message || error?.message,
			error?.status || 500,
		)
	}
}
