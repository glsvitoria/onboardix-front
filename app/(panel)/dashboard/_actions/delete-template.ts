'use server'

import { revalidatePath } from 'next/cache'
import { handleApiError } from '@/lib/api/handle-error'
import { deleteTemplatesService } from '@/services/templates/delete'

export async function deleteTemplateAction(id: string) {
	try {
		await deleteTemplatesService({
			templateId: id,
		})

		revalidatePath('/dashboard/templates')

		return { success: true }
	} catch (error: any) {
		return handleApiError({
			error,
		})
	}
}
