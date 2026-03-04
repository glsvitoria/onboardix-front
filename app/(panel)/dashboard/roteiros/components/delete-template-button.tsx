// src/app/dashboard/templates/_components/delete-template-button.tsx
'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { deleteTemplateAction } from '../../_actions/delete-template'

interface DeleteTemplateButtonProps {
	id: string
	redirectTo?: string
}

export function DeleteTemplateButton({
	id,
	redirectTo,
}: DeleteTemplateButtonProps) {
	const router = useRouter()
	const [isPending, setIsPending] = useState(false)

	async function handleDelete(e: React.MouseEvent) {
		e.preventDefault() // Importante: impede que o Link do card seja acionado
		e.stopPropagation() // Impede que o clique suba para o Link

		setIsPending(true)
		const result = await deleteTemplateAction(id)
		setIsPending(false)


	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8 text-zinc-600 hover:text-destructive hover:bg-destructive/10 transition-colors"
					onClick={(e) => e.stopPropagation()} // Garante que o modal abra sem navegar
				>
					<Trash2 size={16} />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="bg-zinc-950 border-white/10">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-white">
						Você tem certeza?
					</AlertDialogTitle>
					<AlertDialogDescription className="text-zinc-400">
						Esta ação não pode ser desfeita. Isso excluirá permanentemente o
						roteiro e todas as atividades vinculadas a ele.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						className="bg-zinc-900 border-white/5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
						disabled={isPending}
					>
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						className="bg-destructive text-white hover:bg-destructive/90"
						disabled={isPending}
					>
						Excluir Roteiro
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
