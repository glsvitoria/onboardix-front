'use server'

import { handleApiError } from '@/lib/api/handle-error'
import { formatZodErrors } from '@/lib/format-zod-errors'
import { assignTemplateEmployeesService } from '@/services/employees/assign-template'
import { ActionState } from '@/types/action-state'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import z from 'zod'

const acceptInvitationSchema = z.object({
	userId: z.string().min(1, 'O ID do usuário é obrigatório'),
	templateId: z.string().min(1, 'O ID do roteiro é obrigatório'),
})

type State = ActionState<typeof acceptInvitationSchema>

export async function assignTemplateAction(
	_prevState: State | null,
	formData: FormData
) {
	const rawData = Object.fromEntries(formData.entries())

	const validatedFields = acceptInvitationSchema.safeParse(rawData)

	if (!validatedFields.success) {
		return {
			errors: formatZodErrors(validatedFields),
			inputs: rawData,
			success: false,
		}
	}

	try {
		await assignTemplateEmployeesService(validatedFields.data)

		revalidatePath(`/dashboard/colaboradores/${validatedFields.data.userId}`)
	} catch (error: any) {
		return handleApiError({
			error,
		})
	}
	redirect(`/dashboard/colaboradores/${validatedFields.data.userId}`)
}
