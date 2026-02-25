'use server'

import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { handleApiError } from '@/lib/api/handle-error'
import { ActionState } from '@/types/action-state'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Schema para validação rápida no client-side antes de enviar para a API
const inviteSchema = z.object({
	email: z
		.string()
		.email('O e-mail deve ser válido')
		.min(1, 'O e-mail é obrigatório'),
	// role: z.enum(['ADMIN', 'MEMBER'], {
	// 	errorMap: () => ({ message: 'Selecione um cargo válido' }),
	// }),
})

type State = ActionState<typeof inviteSchema>

export async function createInviteAction(
	_prevState: State | null,
	formData: FormData
): Promise<State> {
	const rawData = Object.fromEntries(formData.entries())

	const validatedFields = inviteSchema.safeParse(rawData)

	if (!validatedFields.success) {
		const fieldErrors: Record<string, string[]> = {}

		validatedFields.error.issues.forEach((issue) => {
			const path = issue.path.join('.')
			fieldErrors[path] = [issue.message]
		})

		return {
			success: false,
			errors: fieldErrors,
			inputs: rawData,
		}
	}


	try {
		await api.post('/invitations', validatedFields.data)

		revalidatePath('/dashboard/colaboradores')
		return { success: true }
	} catch (error: any) {
    console.log(error)
		return handleApiError({
			error,
			inputs: rawData,
		})
	}
}
