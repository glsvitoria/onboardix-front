'use server'

import { handleApiError } from '@/lib/api/handle-error'
import { ActionState } from '@/types/action-state'
import { z } from 'zod'
import { createOrganizationsService } from '@/services/organizations/create'
import { formatZodErrors } from '@/lib/format-zod-errors'

const registerOrgSchema = z
	.object({
		companyName: z.string().min(1, 'O nome da empresa é obrigatório'),
		ownerName: z.string().min(1, 'O nome do dono é obrigatório'),
		email: z.string().email('O e-mail deve ser válido'),
		password: z.string().min(6, 'A senha deve ter no mínimo 6 dígitos'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	})

type State = ActionState<typeof registerOrgSchema>

export async function registerOrgAction(
	_prevState: State | null,
	formData: FormData,
): Promise<State> {
	const rawInput = Object.fromEntries(formData.entries())
	const validatedFields = registerOrgSchema.safeParse(rawInput)

	if (!validatedFields.success) {
		return {
			errors: formatZodErrors(validatedFields),
			inputs: rawInput,
			timestamp: Date.now(),
			success: false,
		}
	}

	try {
		const { message } = await createOrganizationsService({
			body: validatedFields.data,
		})

		return {
			timestamp: Date.now(),
			message,
			success: true,
		}
	} catch (error: any) {
		return handleApiError({
			error,
			inputs: rawInput,
		})
	}
}
