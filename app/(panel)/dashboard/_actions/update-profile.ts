'use server'

import { handleApiError } from '@/lib/api/handle-error'
import { formatZodErrors } from '@/lib/format-zod-errors'
import { updateProfileUsersService } from '@/services/users/update-profile'
import { ActionState } from '@/types/action-state'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const updateProfileSchema = z.object({
	fullName: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
	email: z.string().email('E-mail inválido'),
})

type State = ActionState<typeof updateProfileSchema>

export async function updateProfileAction(
	_prevState: State | null,
	formData: FormData
): Promise<State> {
	const rawData = Object.fromEntries(formData.entries())

	const validatedFields = updateProfileSchema.safeParse(rawData)

	if (!validatedFields.success) {
		return {
			errors: formatZodErrors(validatedFields),
			inputs: rawData,
			success: false,
		}
	}

	try {
		await updateProfileUsersService({
			body: validatedFields.data,
		})

		revalidatePath('/dashboard/perfil')

		return {
			success: true,
			inputs: rawData,
		}
	} catch (error: any) {
		return handleApiError({
			error,
			inputs: rawData,
		})
	}
}
