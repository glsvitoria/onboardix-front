'use server'

import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { handleApiError } from '@/lib/api/handle-error'
import { ActionState } from '@/types/action-state'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const updateProfileSchema = z.object({
	fullName: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
	email: z.string().email('E-mail inválido'),
})

type State = ActionState<typeof updateProfileSchema>

export async function updateProfileAction(
	_prevState: State | null,
	formData: FormData
): Promise<State> {
	const rawData = Object.fromEntries(formData.entries())

	const validated = updateProfileSchema.safeParse(rawData)

	if (!validated.success) {
		return {
			errors: validated.error.flatten().fieldErrors,
			inputs: rawData,
		}
	}

	try {
		await api.patch('/users/profile', validated.data)

		revalidatePath('/dashboard/perfil')

		return {
			success: true,
			inputs: rawData,
		}
	} catch (error: any) {
		return handleApiError({
			error,
			inputs: rawData,
		})
	}
}
