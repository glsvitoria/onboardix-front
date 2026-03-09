'use server'

import { handleApiError } from '@/lib/api/handle-error'
import { formatZodErrors } from '@/lib/format-zod-errors'
import { assignTemplateEmployeesService } from '@/services/employees/assign-template'
import { ActionState } from '@/types/action-state'
import { revalidatePath } from 'next/cache'
import z from 'zod'

const acceptInvitationSchema = z.object({
	userId: z.string().min(1, 'O ID do usuário é obrigatório'),
	templateId: z.string().min(1, 'O ID do roteiro é obrigatório'),
})

type State = ActionState<typeof acceptInvitationSchema>

export async function assignTemplateAction(
	_prevState: State | null,
	formData: FormData,
) {
	const rawData = Object.fromEntries(formData.entries())

	const validatedFields = acceptInvitationSchema.safeParse(rawData)

	if (!validatedFields.success) {
		return {
			errors: formatZodErrors(validatedFields),
			inputs: rawData,
			timestamp: Date.now(),
			success: false,
		}
	}

	try {
		const { message } = await assignTemplateEmployeesService({
			params: validatedFields.data,
		})

		revalidatePath(`/dashboard/colaboradores/${validatedFields.data.userId}`)

		return {
			timestamp: Date.now(),
			message,
			success: true,
		}
	} catch (error: any) {
		return handleApiError({
			error,
		})
	}
}
