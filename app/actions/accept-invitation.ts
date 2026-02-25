'use server'

import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { handleApiError } from '@/lib/api/handle-error'
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
	formData: FormData
): Promise<State> {
	const rawData = Object.fromEntries(formData.entries())

	const validated = acceptInvitationSchema.safeParse(rawData)

	if (!validated.success) {
		return {
			errors: validated.error.flatten().fieldErrors,
		}
	}

	try {
		await api.post('/invitations/accept', validated.data)
	} catch (error: any) {
    console.log(error)
		return handleApiError({
			error,
			inputs: rawData,
		})
	}

	// 3. Sucesso
	redirect('/auth?success=account-created')
}
