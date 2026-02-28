'use server'

import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { handleApiError } from '@/lib/api/handle-error'
import { formatZodErrors } from '@/lib/format-zod-errors'
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
	const validatedFields = toggleTaskSchema.safeParse(data)

	if (!validatedFields.success) {
		return {
			errors: formatZodErrors(validatedFields),
			success: false,
		}
	}

	try {
		// Chamada para a rota PATCH: :taskId/toggle
		await api.patch(`/my-tasks/${validatedFields.data.userTaskId}/toggle`, {
			completed: validatedFields.data.completed,
		})

		// Revalida a página para atualizar o progresso e os contadores
		revalidatePath('/onboarding')

		// Retornamos um estado vazio de erro para indicar sucesso (seguindo o padrão ActionState)
		return { success: true }
	} catch (error: any) {
		console.error('Toggle Task Error:', error)
		return handleApiError({
			error,
			inputs: data,
		})
	}
}
