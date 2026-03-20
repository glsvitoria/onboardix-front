'use server'

import { ActionState } from '@/types/action-state'
import { z } from 'zod'
import { handleApiError } from '@/lib/api/handle-error'
import { createVerificationRequestService } from '@/services/verification-request/forgot-password'
import { resetPasswordAuthService } from '@/services/auth/reset-password'

const resetPasswordSchema = z
	.object({
		newPassword: z
			.string()
			.min(6, 'A senha deve conter no mínimo 6 caracteres'),
		confirmPassword: z
			.string()
			.min(6, 'A confirmação de senha deve conter no mínimo 6 caracteres'),
		token: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'As senhas não coincidem',
	})

type State = ActionState<typeof resetPasswordSchema>

export async function resetPasswordAction(
	_prevState: State | null,
	formData: FormData,
): Promise<State> {
	const rawInput = Object.fromEntries(formData.entries())
	const validatedFields = resetPasswordSchema.safeParse(rawInput)

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			inputs: rawInput,
			timestamp: Date.now(),
			success: false,
		}
	}

	try {
		const { message } = await resetPasswordAuthService({
			body: {
				newPassword: validatedFields.data.newPassword,
				token: validatedFields.data.token,
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
