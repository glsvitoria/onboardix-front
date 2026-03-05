'use server'

import { handleApiError } from '@/lib/api/handle-error'
import { ActionState } from '@/types/action-state'
import z from 'zod'
import { revalidatePath } from 'next/cache'
import { formatZodErrors } from '@/lib/format-zod-errors'
import { updateTemplatesService } from '@/services/templates/update'

const updateTemplateSchema = z.object({
	templateId: z.string().min(1, 'O ID do roteiro é obrigatório'),
	title: z.string().min(1, 'O título do roteiro é obrigatório'),
	description: z.string().optional(),
	tasks: z
		.array(
			z.object({
				id: z.string().optional(),
				title: z.string().min(1, 'O título da atividade é obrigatório'),
				content: z.string().optional(),
			}),
		)
		.min(1, 'A trilha deve ter pelo menos uma atividade'),
})

type State = ActionState<typeof updateTemplateSchema>

export async function updateTemplateAction(
	_prevState: State | null,
	formData: FormData,
): Promise<State> {
	const rawData = Object.fromEntries(formData.entries())

	const tasksMap: Record<number, any> = {}

	Object.keys(rawData).forEach((key) => {
		const match = key.match(/tasks\[(\d+)\]\[(\w+)\]/)
		if (match) {
			const index = parseInt(match[1])
			const field = match[2]

			if (!tasksMap[index]) tasksMap[index] = {}
			tasksMap[index][field] = rawData[key]
		}
	})

	const tasks = Object.values(tasksMap) as {
		id?: string
		title: string
		content?: string
	}[]

	const validatedFields = updateTemplateSchema.safeParse({
		templateId: rawData.templateId as string,
		title: rawData.title as string,
		description: rawData.description as string,
		tasks,
	})

	if (!validatedFields.success) {
		return {
			errors: formatZodErrors(validatedFields),
			inputs: rawData,
			timestamp: Date.now(),
			success: false,
		}
	}

	try {
		const { templateId, ...body } = validatedFields.data

		const { message } = await updateTemplatesService({
			body,
			params: {
				templateId,
			},
		})

		revalidatePath('/dashboard/roteiros')
		revalidatePath(`/dashboard/roteiros/${templateId}`)

		return { timestamp: Date.now(), message, success: true }
	} catch (error: any) {
		return handleApiError({ error, inputs: rawData })
	}
}
