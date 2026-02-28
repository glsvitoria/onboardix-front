import { ChevronLeft, UserPlus, UserX } from 'lucide-react'
import { NotFound } from '@/components/not-found'

export default function EmployeeNotFound() {
	return (
		<NotFound.Root
			description="Não conseguimos localizar o perfil solicitado. O colaborador pode ter
				sido removido da organização ou o ID fornecido é inválido."
			helperMessage="Verifique o identificador na URL"
			icon={UserX}
			title="Colaborador não encontrado"
		>
			<NotFound.Button
				to="/dashboard/roteiros"
				type="outline"
				icon={ChevronLeft}
			>
				Voltar para a Equipe
			</NotFound.Button>
			<NotFound.Button
				to="/dashboard/roteiros/novo"
				type="default"
				icon={UserPlus}
			>
				Convidar novo
			</NotFound.Button>
		</NotFound.Root>
	)
}
