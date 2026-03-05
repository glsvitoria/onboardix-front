'use server'

import { ActionState } from '@/types/action-state'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/common/token'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { handleApiError } from '@/lib/api/handle-error'
import { loginAuthService } from '@/services/auth/login'
import { UserRole } from '@/types/user'

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
      timestamp: Date.now(),
			success: false,
		}
	}

	try {
		const {
			accessToken,
			accessTokenExpiresAt,
			refreshToken,
			refreshTokenExpiresAt,
      user
		} = await loginAuthService({
			body: validatedFields.data,
		})

		const cookieStore = await cookies()

		const cookieOptions = {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax' as const,
		}

		cookieStore.set(ACCESS_TOKEN, accessToken, {
			...cookieOptions,
			expires: new Date(accessTokenExpiresAt),
		})

		cookieStore.set(REFRESH_TOKEN, refreshToken, {
			...cookieOptions,
			expires: new Date(refreshTokenExpiresAt),
		})

    return {
      timestamp: Date.now(),
      message: `Login de ${user.role === UserRole.MEMBER ? 'colaborador' : 'usuário'} realizado com sucesso`,
      success: true,
    }
	} catch (error: any) {
		return handleApiError({
			error,
			inputs: rawInput,
		})
	}

}
