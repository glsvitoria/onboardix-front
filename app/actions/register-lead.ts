'use server'

import { handleApiError } from '@/lib/api/handle-error'
import { ActionState } from '@/types/action-state'
import { z } from 'zod'
import { fetchAdapter as api } from '@/lib/api/fetch-adapter'

const registerLeadSchema = z.object({
	email: z.string().email('E-mail inválido'),
})

type State = ActionState<typeof registerLeadSchema>

export async function registerLeadAction(
	_prevState: State | null,
	formData: FormData
): Promise<State> {
	const rawInput = Object.fromEntries(formData.entries())
	const validatedFields = registerLeadSchema.safeParse(rawInput)

	if (!validatedFields.success) {
		return {
			errors: {
				global: validatedFields.error.flatten().fieldErrors.email?.[0],
			},
			inputs: rawInput,
		}
	}

	try {
		await api.post('/leads/register', validatedFields.data)

		return { success: true }
	} catch (error) {
		return handleApiError({
			error,
			inputs: rawInput,
		})
	}
}
