import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { RequestOptionsService } from '@/lib/api/types'
import { ServiceError } from '@/types/service-error'
import { UserWithProgress } from '@/types/user'

interface ShowEmployeesResponse extends UserWithProgress {}

interface ShowEmployeesProps {
	params: {
		employeeId: string
	}
	options?: RequestOptionsService
}

export async function showEmployeesService(
	props: ShowEmployeesProps,
): Promise<ShowEmployeesResponse> {
	const { params, options } = props

	try {
		const response = await api.get<ShowEmployeesResponse>(
			`/employees/${params.employeeId}/detail`,
			options,
		)

		return response
	} catch (error: any) {
		throw new ServiceError(
			error?.message || 'Ocorreu um erro ao buscar os dados do colaborador.',
			error?.status || 500,
		)
	}
}
