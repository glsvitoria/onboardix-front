'use server'

import { handleApiError } from '@/lib/api/handle-error'
import { formatZodErrors } from '@/lib/format-zod-errors'
import { toggleUserTasksService } from '@/services/userTasks/toggle-task'
import { ActionState } from '@/types/action-state'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const toggleTaskSchema = z.object({
	userTaskId: z.string().uuid('ID da tarefa inválido'),
	completed: z
		.enum(['true', 'false'], {
			message: 'Valor de completado inválido, deve ser "true" ou "false"',
		})
		.transform((val) => val === 'true'),
})

type State = ActionState<typeof toggleTaskSchema>

export async function toggleTaskAction(
	_prevState: State | null,
	formData: FormData,
): Promise<State> {
	const rawData = Object.fromEntries(formData.entries())

	const validatedFields = toggleTaskSchema.safeParse(rawData)

	if (!validatedFields.success) {
		return {
			errors: formatZodErrors(validatedFields),
			success: false,
			timestamp: Date.now(),
		}
	}

	try {
		const { message } = await toggleUserTasksService({
			params: {
				userTaskId: validatedFields.data.userTaskId,
			},
			body: {
				completed: !validatedFields.data.completed,
			},
		})

		revalidatePath('/onboarding')

		return { success: true, message, timestamp: Date.now() }
	} catch (error: any) {
		console.error('Toggle Task Error:', error)
		return handleApiError({
			error,
			inputs: rawData,
		})
	}
}
