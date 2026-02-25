'use server'

import { ActionState } from '@/types/action-state'
import { z } from 'zod'
import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { handleApiError } from '@/lib/api/handle-error'
import { revalidatePath } from 'next/cache'

const createTemplateSchema = z.object({
	title: z.string().min(1, 'O título do roteiro é obrigatório'),
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
	formData: FormData // 'data' aqui é o FormData enviado pelo form
): Promise<State> {
	const rawData = Object.fromEntries(formData.entries())

	// 1. Reconstrução do array de tasks
	const tasks: any[] = []
	Object.keys(rawData).forEach((key) => {
		const match = key.match(/tasks\[(\d+)\]\[(\w+)\]/)
		if (match) {
			const index = parseInt(match[1])
			const field = match[2]
			if (!tasks[index]) tasks[index] = {}
			tasks[index][field] = rawData[key]
		}
	})

	const payload = {
		title: rawData.title as string,
		description: rawData.description as string,
		tasks: tasks.filter(Boolean),
	}

	// 2. Validação com mapeamento de caminhos detalhados
	const validatedFields = createTemplateSchema.safeParse(payload)

	if (!validatedFields.success) {
		const fieldErrors: Record<string, string[]> = {}

		validatedFields.error.issues.forEach((issue) => {
			const path = issue.path.join('.')
			fieldErrors[path] = [issue.message]
		})

		return {
			success: false,
			errors: fieldErrors,
			inputs: payload,
		}
	}

	try {
		await api.post('/templates', validatedFields.data)

		revalidatePath('/dashboard/roteiros')

		return { success: true }
	} catch (error: any) {
		// Certifique-se que o handleApiError suporte receber o objeto payload em 'inputs'
		return handleApiError({
			error,
			inputs: payload,
		})
	}
}
