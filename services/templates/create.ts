import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'
import { TemplateWithTasksCount } from '@/types/template'

interface CreateTemplatesResponse {
	message: string
}

interface CreateTemplatesProps {
	body: {
		title: string
		description?: string
		tasks: {
			title: string
			content?: string
		}[]
	}
	options?: RequestOptionsService
}

export async function createTemplatesService(
	props: CreateTemplatesProps,
): Promise<CreateTemplatesResponse> {
	const { body, options } = props
	try {
		const response = await api.post<CreateTemplatesResponse>(
			'/templates',
			body,
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
