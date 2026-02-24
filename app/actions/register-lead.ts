'use server'

import { ActionState } from '@/@types/action-state'
import { z } from 'zod'

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
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/leads/register`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: validatedFields.data.email }),
			}
		)

		const data = await response.json()

		if (!response.ok) {
			return {
				errors: {
					global: data.message || 'Erro ao realizar o cadastro do lead.',
				},
				inputs: rawInput,
			}
		}

		return { success: true }
	} catch (error) {
		console.error('[RegisterLeadAction Error]', error)
		return {
			errors: {
				global: 'Erro de conexão. Verifique sua internet e tente novamente.',
			},
			inputs: rawInput,
		}
	}
}
