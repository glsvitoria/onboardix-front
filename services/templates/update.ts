import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface UpdateTemplatesResponse {
	message: string
}

interface UpdateTemplatesProps {
	body: {
		title?: string
		description?: string
		tasks: {
			title?: string
			content?: string
		}[]
	}
	params: {
		templateId: string
	}
	options?: RequestOptionsService
}

export async function updateTemplatesService(
	props: UpdateTemplatesProps,
): Promise<UpdateTemplatesResponse> {
	const { body, params, options } = props
	try {
		const response = await api.put<UpdateTemplatesResponse>(
			`/templates/${params.templateId}`,
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
