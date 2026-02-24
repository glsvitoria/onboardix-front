'use server'

import { ActionState } from '@/@types/action-state'
import { ACCESS_TOKEN } from '@/common/token'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const createTemplateSchema = z.object({
	title: z.string().min(1, 'O título da trilha é obrigatório'),
	description: z.string().optional(),
	tasks: z
		.array(
			z.object({
				title: z.string().min(1, 'O título da atividade é obrigatório'),
				content: z.string().optional(),
			})
		)
		.min(1, 'A trilha deve ter pelo menos uma atividade'),
})

type State = ActionState<typeof createTemplateSchema>

export async function createTemplateAction(
	_prevState: State | null,
	data: any // Recebemos o objeto direto para lidar com o array de tasks mais facilmente
): Promise<State> {
	// Validamos os campos
	const validatedFields = createTemplateSchema.safeParse(data)

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			inputs: data,
		}
	}

	try {
		const token = (await cookies()).get(ACCESS_TOKEN)?.value

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/templates`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(validatedFields.data),
			}
		)

		const result = await response.json()

		if (!response.ok) {
			return {
				errors: { global: result.message || 'Erro ao criar trilha.' },
				inputs: data,
			}
		}

		revalidatePath('/dashboard/templates')
		return { success: true }
	} catch (e) {
		console.error('[CreateTemplateAction Error]', e)
		return {
			errors: { global: 'Falha na conexão com o servidor.' },
			inputs: data,
		}
	}
}
