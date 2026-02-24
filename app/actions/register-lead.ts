'use server'

import { ActionState } from '@/@types/action-state'
import { z } from 'zod'

const schema = z.object({
	email: z.string().email('E-mail inválido'),
})

export async function registerLeadAction(
	_prevState: ActionState | null,
	formData: FormData
) {
	const email = formData.get('email')

	const validatedFields = schema.safeParse({ email })

	if (!validatedFields.success) {
		return { error: validatedFields.error.flatten().fieldErrors.email?.[0] }
	}

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/leads/registe`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: validatedFields.data.email }),
			}
		)

		if (!response.ok) {
			throw new Error('Falha na API')
		}

		return { success: true }
	} catch (error) {
		console.log(error)
		return {
			error:
				'Tivemos um problema na hora de cadastrarmos seu interesse. Tente novamente.',
		}
	}
}
