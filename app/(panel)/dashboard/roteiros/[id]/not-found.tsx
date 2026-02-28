import { ChevronLeft, FileQuestion, Plus } from 'lucide-react'
import { NotFound } from '@/components/not-found'

export default function TemplateNotFound() {
	return (
		<NotFound.Root
			description="Não conseguimos localizar o roteiro solicitado. Ele pode ter sido
				removido ou o link está incorreto."
			helperMessage="Verifique se o ID na barra de endereços está correto"
			icon={FileQuestion}
			title="Roteiro não encontrado"
		>
			<NotFound.Button
				to="/dashboard/roteiros"
				type="outline"
				icon={ChevronLeft}
			>
				Voltar para a lista
			</NotFound.Button>
			<NotFound.Button to="/dashboard/roteiros/novo" type="default" icon={Plus}>
				Criar roteiro
			</NotFound.Button>
		</NotFound.Root>
	)
}
