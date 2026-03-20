'use server'

import { ActionState } from '@/types/action-state'
import { z } from 'zod'
import { handleApiError } from '@/lib/api/handle-error'
import { createVerificationRequestService } from '@/services/verification-request/forgot-password'

const forgotPasswordSchema = z.object({
	email: z.string().email('E-mail inválido'),
})

type State = ActionState<typeof forgotPasswordSchema>

export async function forgotPasswordAction(
	_prevState: State | null,
	formData: FormData,
): Promise<State> {
	const rawInput = Object.fromEntries(formData.entries())
	const validatedFields = forgotPasswordSchema.safeParse(rawInput)

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			inputs: rawInput,
			timestamp: Date.now(),
			success: false,
		}
	}

	try {
		const { message } = await createVerificationRequestService({
			body: {
				identifier: validatedFields.data.email,
			},
		})

		return {
			timestamp: Date.now(),
			message,
			success: true,
		}
	} catch (error: any) {
		return handleApiError({
			error,
			inputs: rawInput,
		})
	}
}
