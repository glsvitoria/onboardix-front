'use client'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { Mail, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { createInviteAction } from '../../_actions/create-invite'

export const FormInvite = () => {
	const router = useRouter()
	const [state, formAction, isPending] = useActionState(
		createInviteAction,
		null
	)

	useEffect(() => {
		if (state?.success) {
			router.push('/dashboard/colaboradores')
		}
	}, [state, router])

	return (
		<form action={formAction} className="space-y-6">
			<FormInput
				label="E-mail do colaborador"
				name="email"
				type="email"
				placeholder="exemplo@empresa.com"
				error={state?.errors?.email}
				defaultValue={state?.inputs?.email}
				icon={Mail}
			/>

			<div className="pt-4">
				<Button
					isLoading={isPending}
					className="w-full h-12 bg-primary text-black font-bold hover:bg-primary/90 rounded-xl transition-all"
				>
					<Send size={18} className="mr-2" />
					Enviar Convite
				</Button>
			</div>
		</form>
	)
}
