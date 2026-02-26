import { FormInvite } from './form'
import { BackButton } from '@/components/back-button'

export default function InvitePage() {
	return (
		<div className="max-w-xl mx-auto p-8">
			<BackButton to="/dashboard/colaboradores">Voltar para Equipe</BackButton>

			<div className="space-y-2 mb-8">
				<h1 className="text-3xl font-bold text-white">Convidar Colaborador</h1>
				<p className="text-zinc-500">
					O convidado receberá um e-mail com as instruções para acessar a
					organização.
				</p>
			</div>

			<FormInvite />
		</div>
	)
}
