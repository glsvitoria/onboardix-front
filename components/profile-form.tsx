'use client'

import { updateProfileAction } from '@/app/actions/update-profile'
import { FormInput } from '@/components/ui/form-input'
import { UserWithOrganization } from '@/types/user'
import { Mail, User } from 'lucide-react'
import { useActionState } from 'react'
import { Button } from './ui/button'

interface ProfileFormProps {
	user?: UserWithOrganization
}

export const ProfileForm = ({ user }: ProfileFormProps) => {
	const [state, formAction, isPending] = useActionState(
		updateProfileAction,
		null
	)

	return (
		<form action={formAction} className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<FormInput
					label="Nome"
					name="fullName"
					placeholder="Digite o seu nome"
					error={state?.errors?.fullName}
					defaultValue={state?.inputs?.fullName ?? user?.fullName}
					icon={User}
				/>
				<FormInput
					label="E-mail"
					name="email"
					type="email"
					placeholder="exemplo@empresa.com"
					error={state?.errors?.email}
					defaultValue={state?.inputs?.email ?? user?.email}
					icon={Mail}
				/>
			</div>

			{state?.errors?.global && (
				<div className="p-4 rounded-2xl bg-destructive/10 text-destructive text-sm text-center font-medium">
					{state.errors.global}
				</div>
			)}

			<Button isLoading={isPending} size="xl" type="submit">
				Salvar Alterações
			</Button>
		</form>
	)
}
