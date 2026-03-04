'use server'

import { handleApiError } from '@/lib/api/handle-error'
import { formatZodErrors } from '@/lib/format-zod-errors'
import { toggleUserTasksService } from '@/services/userTasks/toggle-task'
import { ActionState } from '@/types/action-state'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const toggleTaskSchema = z.object({
	userTaskId: z.string().uuid('ID da tarefa inválido'),
	completed: z.boolean({
		message: 'O valor de completo deve ser verdadeiro ou falso',
	}),
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
		await toggleUserTasksService({
			params: {
				userTaskId: validatedFields.data.userTaskId,
			},
			body: {
				completed: validatedFields.data.completed,
			},
		})

		revalidatePath('/onboarding')

		return { success: true }
	} catch (error: any) {
		console.error('Toggle Task Error:', error)
		return handleApiError({
			error,
			inputs: data,
		})
	}
}
