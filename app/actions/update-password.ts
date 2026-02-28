'use server'

import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { handleApiError } from '@/lib/api/handle-error'
import { formatZodErrors } from '@/lib/format-zod-errors'
import { updatePasswordUsersService } from '@/services/users/update-password'
import { ActionState } from '@/types/action-state'
import { z } from 'zod'

const updatePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, 'A senha atual é obrigatória'),
		newPassword: z
			.string()
			.min(6, 'A nova senha deve ter no mínimo 6 caracteres'),
		confirmPassword: z
			.string()
			.min(6, 'A confirmação deve ter no mínimo 6 caracteres'),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	})

type State = ActionState<typeof updatePasswordSchema>

export async function updatePasswordAction(
	_prevState: State | null,
	formData: FormData
): Promise<State> {
	const rawData = Object.fromEntries(formData.entries())

	const validatedFields = updatePasswordSchema.safeParse(rawData)

	if (!validatedFields.success) {
		return {
			errors: formatZodErrors(validatedFields),
			inputs: rawData,
			success: false,
		}
	}

	try {
		await updatePasswordUsersService({
			body: validatedFields.data,
		})

		return {
			success: true,
		}
	} catch (error: any) {
		return handleApiError({
			error,
			inputs: rawData,
		})
	}
}
