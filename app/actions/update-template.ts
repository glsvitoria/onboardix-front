'use server'

import { handleApiError } from "@/lib/api/handle-error"
import { ActionState } from "@/types/action-state"
import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import z from "zod"
import { revalidatePath } from "next/cache"

const updateTemplateSchema = z.object({
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

type State = ActionState<typeof updateTemplateSchema>

export async function updateTemplateAction(
	id: string, // Precisamos do ID para saber quem editar
	_prevState: State | null,
	formData: FormData
): Promise<State> {
	const rawData = Object.fromEntries(formData.entries())

	// Reconstrução do array de tasks (mesma lógica do anterior)
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

	const validatedFields = updateTemplateSchema.safeParse(payload)

	if (!validatedFields.success) {
		const fieldErrors: Record<string, string[]> = {}
		validatedFields.error.issues.forEach((issue) => {
			const path = issue.path.join('.')
			fieldErrors[path] = [issue.message]
		})

		return { errors: fieldErrors, inputs: payload }
	}

	try {
		// Chamada PATCH para o backend
		await api.patch(`/templates/${id}`, validatedFields.data)

		revalidatePath('/dashboard/roteiros')
		revalidatePath(`/dashboard/roteiros/${id}`)

		return { success: true }
	} catch (error: any) {
		return handleApiError({ error, inputs: payload })
	}
}
