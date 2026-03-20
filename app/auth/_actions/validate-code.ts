'use server'

import { ActionState } from '@/types/action-state'
import { z } from 'zod'
import { handleApiError } from '@/lib/api/handle-error'
import { validateVerificationRequestService } from '@/services/verification-request/validate'

const validateCodeSchema = z.object({
	email: z.string().email('E-mail inválido'),
	code: z.string().length(6, 'Código inválido'),
})

type State = ActionState<typeof validateCodeSchema>

export async function validateCodeAction(
	_prevState: State | null,
	formData: FormData,
): Promise<State> {
	const rawInput = Object.fromEntries(formData.entries())
	const validatedFields = validateCodeSchema.safeParse(rawInput)

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			inputs: rawInput,
			timestamp: Date.now(),
			success: false,
		}
	}

	try {
		const { message, token } = await validateVerificationRequestService({
			body: {
				identifier: validatedFields.data.email,
				code: validatedFields.data.code,
			},
		})

		return {
			timestamp: Date.now(),
			message,
			data: {
				token: token,
			},
			success: true,
		}
	} catch (error: any) {
		return handleApiError({
			error,
			inputs: rawInput,
		})
	}
}
