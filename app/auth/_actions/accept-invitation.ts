'use server'

import { handleApiError } from '@/lib/api/handle-error'
import { formatZodErrors } from '@/lib/format-zod-errors'
import { acceptInvitationsService } from '@/services/invitations/accept'
import { ActionState } from '@/types/action-state'
import { redirect } from 'next/navigation'

import { z } from 'zod'

const acceptInvitationSchema = z
	.object({
		token: z.string().min(1, 'Token é obrigatório'),
		fullName: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
		password: z.string().min(6, 'A senha deve ter no mínimo 6 dígitos'),
		confirmPassword: z
			.string()
			.min(6, 'A confirmação deve ter no mínimo 6 dígitos'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	})

type State = ActionState<typeof acceptInvitationSchema>

export async function acceptInvitationAction(
	_prevState: State | null,
	formData: FormData,
): Promise<State> {
	const rawData = Object.fromEntries(formData.entries())

	const validatedFields = acceptInvitationSchema.safeParse(rawData)

	if (!validatedFields.success) {
		return {
			errors: formatZodErrors(validatedFields),
			inputs: rawData,
			timestamp: Date.now(),
			success: false,
		}
	}

	try {
		const { message } = await acceptInvitationsService({
			body: validatedFields.data,
		})

		return {
			timestamp: Date.now(),
			message,
			success: true,
		}
	} catch (error: any) {
		return handleApiError({
			error,
			inputs: rawData,
		})
	}
}
