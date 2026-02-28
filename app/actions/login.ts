'use server'

import { ActionState } from '@/types/action-state'
import { ACCESS_TOKEN } from '@/common/token'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { handleApiError } from '@/lib/api/handle-error'
import { loginAuthService } from '@/services/auth/login'

const loginSchema = z.object({
	email: z.string().email('E-mail inválido'),
	password: z.string().min(1, 'A senha é obrigatória'),
})

type State = ActionState<typeof loginSchema>

export async function loginAction(
	_prevState: State | null,
	formData: FormData
): Promise<State> {
	const rawInput = Object.fromEntries(formData.entries())
	const validatedFields = loginSchema.safeParse(rawInput)

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			inputs: rawInput,
		}
	}

	try {
		const { access_token } = await loginAuthService({
			body: validatedFields.data,
		})

		const cookieStore = await cookies()

		cookieStore.set(ACCESS_TOKEN, access_token, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7, // 7 dias
		})
	} catch (error: any) {
		return handleApiError({
			error,
			inputs: rawInput,
		})
	}

	redirect('/dashboard')
}
