'use client'

import { Button } from '@/components/ui/button'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { useActionState, useState } from 'react'
import { useActionToast } from '@/hooks/use-action-toast'
import { useRouter } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'
import { validateCodeAction } from '../../_actions/validate-code'

export const FormValidateCode = ({ email }: { email?: string }) => {
	const router = useRouter()
	const [code, setCode] = useState('')

	const [state, formAction, isPending] = useActionState(
		validateCodeAction,
		null,
	)

	useActionToast(state, () => {
		router.push(`/auth/recuperar-senha/alterar?token=${state?.data?.token}`)
	})

	return (
		<form action={formAction} className="flex flex-col items-center space-y-6">
			<input type="hidden" name="email" value={email} />
			<input type="hidden" name="code" value={code} />

			<div className="space-y-2">
				<InputOTP
					maxLength={6}
					value={code}
					onChange={(value) => setCode(value)}
					disabled={isPending}
					autoFocus
				>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>

				{state?.errors?.code && (
					<p className="text-center text-xs font-medium text-destructive animate-in fade-in">
						{state?.errors.code}
					</p>
				)}
			</div>

			{state?.errors?.global && (
				<div className="w-full p-3 rounded-lg bg-destructive/10 text-destructive text-xs text-center font-medium">
					{state?.errors.global}
				</div>
			)}

			<Button
				type="submit"
				isLoading={isPending}
				size="xl"
				className="w-full rounded-full font-semibold group"
				disabled={code.length !== 6 || isPending}
			>
				Validar código
				<ShieldCheck className="ml-2 size-4" />
			</Button>

			<div className="text-center">
				<button
					type="button"
					disabled={isPending}
					className="text-xs text-muted-foreground hover:text-primary hover:underline transition-colors"
					onClick={() => router.back()}
				>
					Não recebeu o código? Reenviar
				</button>
			</div>
		</form>
	)
}
