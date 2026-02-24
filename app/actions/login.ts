'use server'

import { ActionState } from '@/@types/action-state'
import { ACCESS_TOKEN } from '@/common/token'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

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
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(validatedFields.data),
			}
		)

		const data = await response.json()

		if (!response.ok) {
			return {
				errors: {
					global: data.message || 'Ocorreu um erro ao realizar login',
				},
				inputs: rawInput,
			}
		}

		const cookieStore = await cookies()
		cookieStore.set(ACCESS_TOKEN, data.access_token, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7, // 7 dias
		})
	} catch (e) {
		return {
			errors: {
				global: 'Erro de conexão. Verifique sua internet e tente novamente.',
			},
			inputs: rawInput,
		}
	}

	redirect('/dashboard')
}
