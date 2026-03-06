import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface DeleteTemplatesResponse {
	message: string
}

interface DeleteTemplatesProps {
	templateId: string
	options?: RequestOptionsService
}

export async function deleteTemplatesService(
	props: DeleteTemplatesProps,
): Promise<DeleteTemplatesResponse> {
	const { templateId, options } = props
	try {
		const response = await api.delete<DeleteTemplatesResponse>(
			`/templates/${templateId}`,
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
