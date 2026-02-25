'use client'

import { useState, useActionState, useEffect } from 'react'
import {
	CheckCircle2,
	Circle,
	ChevronDown,
	ChevronUp,
	Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import { toast } from 'sonner'
import { toggleTaskAction } from '@/app/actions/toggle-task'

interface TaskItemProps {
	task: any
	completed: boolean
	userTaskId: string
}

export function TaskItem({ task, completed, userTaskId }: TaskItemProps) {
	const [isOpen, setIsOpen] = useState(false)

	// Estado local para feedback visual imediato (Optimistic UI)
	const [localCompleted, setLocalCompleted] = useState(completed)

	// Integração com a Action padronizada
	const [state, formAction, isPending] = useActionState(async () => {
		// Inverte o estado atual
		const newStatus = !localCompleted
		setLocalCompleted(newStatus)

		const result = await toggleTaskAction(null, {
			userTaskId,
			completed: newStatus,
		})
		return result
	}, null)

	// Tratamento de erros vindos do ActionState/handleApiError
	useEffect(() => {
		if (state?.errors && Object.keys(state.errors).length > 0) {
			// Se houver erro, reverte o estado local e avisa o usuário
			setLocalCompleted(completed)

			// Tenta pegar o erro global ou o primeiro erro de campo
			const errorMessage = state.errors.global || 'Erro ao atualizar tarefa'
			toast.error(errorMessage)
		} else if (state && !state.errors) {
			toast.success(localCompleted ? 'Tarefa concluída!' : 'Tarefa reaberta')
		}
	}, [state, completed])

	return (
		<div
			className={`border transition-all rounded-[24px] overflow-hidden ${
				isOpen
					? 'bg-zinc-900/60 border-white/10'
					: 'bg-zinc-900/20 border-white/5 hover:border-white/10'
			}`}
		>
			<div
				onClick={() => setIsOpen(!isOpen)}
				className="w-full p-6 flex items-center justify-between text-left cursor-pointer group"
			>
				<div className="flex items-center gap-4">
					<form action={formAction} onClick={(e) => e.stopPropagation()}>
						<button
							type="submit"
							disabled={isPending}
							className={`transition-all transform active:scale-90 outline-none ${
								localCompleted
									? 'text-primary'
									: 'text-zinc-700 hover:text-zinc-500'
							}`}
						>
							{isPending ? (
								<Loader2 size={26} className="animate-spin text-zinc-500" />
							) : localCompleted ? (
								<CheckCircle2 size={26} />
							) : (
								<Circle size={26} />
							)}
						</button>
					</form>

					<div>
						<h3
							className={`font-bold transition-all ${
								localCompleted ? 'text-zinc-500 line-through' : 'text-white'
							}`}
						>
							{task?.title}
						</h3>
						<span className="text-[10px] uppercase text-zinc-600 font-bold tracking-wider">
							Task #{task?.order}
						</span>
					</div>
				</div>

				<div className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
					{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
				</div>
			</div>

			{isOpen && (
				<div className="px-16 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
					<div className="prose prose-invert prose-zinc max-w-none text-zinc-400 text-sm leading-relaxed border-t border-white/5 pt-6">
						<ReactMarkdown>{task?.content}</ReactMarkdown>
					</div>

					<form action={formAction} className="mt-8">
						<Button
							type="submit"
							disabled={isPending}
							className={`rounded-xl font-bold transition-all px-8 ${
								localCompleted
									? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
									: 'bg-white text-black hover:bg-zinc-200'
							}`}
						>
							{isPending && <Loader2 size={16} className="animate-spin mr-2" />}
							{localCompleted ? 'Marcar como pendente' : 'Concluir esta etapa'}
						</Button>
					</form>
				</div>
			)}
		</div>
	)
}
