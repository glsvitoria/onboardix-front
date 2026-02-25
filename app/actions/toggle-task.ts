'use server'

import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { handleApiError } from '@/lib/api/handle-error'
import { ActionState } from '@/types/action-state'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// 1. Schema de Validação
const toggleTaskSchema = z.object({
	userTaskId: z.string().uuid('ID da tarefa inválido'),
	completed: z.boolean(),
})

type State = ActionState<typeof toggleTaskSchema>

export async function toggleTaskAction(
	_prevState: State | null,
	data: { userTaskId: string; completed: boolean }
): Promise<State> {
	// Validamos os dados de entrada
	const validated = toggleTaskSchema.safeParse(data)

	if (!validated.success) {
		return {
			errors: validated.error.flatten().fieldErrors,
		}
	}

	try {
    console.log(validated.data.userTaskId)
		// Chamada para a rota PATCH: :taskId/toggle
		await api.patch(`/my-tasks/${validated.data.userTaskId}/toggle`, {
			completed: validated.data.completed,
		})

		// Revalida a página para atualizar o progresso e os contadores
		revalidatePath('/onboarding')

		// Retornamos um estado vazio de erro para indicar sucesso (seguindo o padrão ActionState)
		return { errors: {} }
	} catch (error: any) {
		console.error('Toggle Task Error:', error)
		return handleApiError({
			error,
			inputs: data,
		})
	}
}
