'use server'

import { handleApiError } from '@/lib/api/handle-error'
import { ActionState } from '@/types/action-state'
import { z } from 'zod'
import { formatZodErrors } from '@/lib/format-zod-errors'
import { createLeadsService } from '@/services/leads/create'

const registerLeadSchema = z.object({
	email: z.string().email('E-mail inválido'),
})

type State = ActionState<typeof registerLeadSchema>

export async function registerLeadAction(
	_prevState: State | null,
	formData: FormData,
): Promise<State> {
	const rawInput = Object.fromEntries(formData.entries())
	const validatedFields = registerLeadSchema.safeParse(rawInput)

	if (!validatedFields.success) {
		return {
			errors: formatZodErrors(validatedFields),
			inputs: rawInput,
			success: false,
			timestamp: Date.now(),
		}
	}

	try {
		const { message } = await createLeadsService({
			body: validatedFields.data,
		})

		return { timestamp: Date.now(), message, success: true }
	} catch (error) {
		return handleApiError({
			error,
			inputs: rawInput,
		})
	}
}
