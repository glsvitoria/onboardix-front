import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'

interface CreateOrganizationsResponse {
	message: string
}

interface CreateOrganizationsProps {
	body: {
		companyName: string
		ownerName: string
		email: string
		password: string
		confirmPassword: string
	}
	options?: RequestOptionsService
}

export async function createOrganizationsService(
	props: CreateOrganizationsProps
): Promise<CreateOrganizationsResponse> {
	const { body, options } = props

	try {
		const response = await api.post<CreateOrganizationsResponse>(
			'/organizations/register',
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
