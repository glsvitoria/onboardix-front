'use server'

import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function assignTemplateAction(
	employeeId: string,
	templateId: string,
	prevState: any,
	formData: FormData
) {
	try {
		await api.post(`/employees/${employeeId}/assign/${templateId}`, {})
		revalidatePath(`/dashboard/colaboradores/${employeeId}`)
		// Retornamos sucesso ou redirecionamos
	} catch (error: any) {
		return {
			error: error.response?.data?.message || 'Erro ao atribuir roteiro.',
		}
	}
	redirect(`/dashboard/colaboradores/${employeeId}`)
}
