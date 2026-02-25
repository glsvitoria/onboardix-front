'use client'

import { useActionState, useEffect } from 'react'
import { FormInput } from '@/components/ui/form-input'
import { Button } from '@/components/ui/button'
import { Mail, ChevronLeft, Loader2, Send } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createInviteAction } from '@/app/actions/create-invite'

export default function InvitePage() {
	const router = useRouter()
	const [state, formAction, isPending] = useActionState(
		createInviteAction,
		null
	)

	useEffect(() => {
		if (state?.success) {
			toast.success('Convite enviado com sucesso!')
			router.push('/dashboard/colaboradores')
		}
	}, [state, router])

	return (
		<div className="max-w-xl mx-auto p-8">
			<Button
				variant="ghost"
				asChild
				className="text-zinc-500 hover:text-white -ml-4 mb-6"
			>
				<Link href="/dashboard/colaboradores">
					<ChevronLeft size={20} /> Voltar
				</Link>
			</Button>

			<div className="space-y-2 mb-8">
				<h1 className="text-3xl font-bold text-white">Convidar Colaborador</h1>
				<p className="text-zinc-500">
					O convidado receberá um e-mail com as instruções para acessar a
					organização.
				</p>
			</div>

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
						disabled={isPending}
						className="w-full h-12 bg-primary text-black font-bold hover:bg-primary/90 rounded-xl transition-all"
					>
						{isPending ? (
							<Loader2 className="animate-spin" />
						) : (
							<>
								<Send size={18} className="mr-2" />
								Enviar Convite
							</>
						)}
					</Button>
				</div>
			</form>
		</div>
	)
}
