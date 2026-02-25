'use server'

import { revalidatePath } from 'next/cache'
import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { handleApiError } from '@/lib/api/handle-error'

export async function deleteTemplateAction(id: string) {
	try {
		await api.delete(`/templates/${id}`)

		revalidatePath('/dashboard/templates')

		return { success: true }
	} catch (error: any) {
		return handleApiError({
			error,
		})
	}
}
