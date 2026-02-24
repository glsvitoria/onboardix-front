'use server'

import { ActionState } from '@/@types/action-state'
import { z } from 'zod'

const registerOrgSchema = z
	.object({
		companyName: z.string().min(1, 'O nome da empresa é obrigatório'),
		ownerName: z.string().min(1, 'O nome do dono é obrigatório'),
		email: z.string().email('O e-mail deve ser válido'),
		password: z.string().min(6, 'A senha deve ter no mínimo 6 dígitos'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	})

type State = ActionState<typeof registerOrgSchema>

export async function registerOrgAction(
	_prevState: State | null,
	formData: FormData
): Promise<State> {
	const rawInput = Object.fromEntries(formData.entries())
	const validatedFields = registerOrgSchema.safeParse(rawInput)

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			inputs: rawInput,
		}
	}

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/organizations/register`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(validatedFields.data),
			}
		)

		const data = await response.json()

		if (!response.ok) {
			return {
				errors: {
					global: data.message || 'Erro ao criar conta.',
				},
				inputs: rawInput,
			}
		}

		return { success: true }
	} catch (e) {
		console.error('[RegisterOrgAction Error]', e)
		return {
			errors: { global: 'Falha na conexão com o servidor.' },
			inputs: rawInput,
		}
	}
}
