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
import { toggleTaskAction } from '../_actions/toggle-task'
import { UserTaskWithTask } from '@/types/user-task'
import { useActionToast } from '@/hooks/use-action-toast'

interface TaskItemProps {
	userTask: UserTaskWithTask
}

export function TaskItem({ userTask }: TaskItemProps) {
	const [isOpen, setIsOpen] = useState(false)

	const [state, formAction, isPending] = useActionState(toggleTaskAction, null)

	useActionToast(state)

	return (
		<div
			className={`border transition-all rounded-3xl overflow-hidden ${
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
						<input type="hidden" name="userTaskId" value={userTask.id} />

						<input type="hidden" name="completed" value="false" />

						<label className="cursor-pointer group">
							<input
								type="checkbox"
								name="completed"
								value="true"
								defaultChecked={!!userTask.completedAt}
								className="hidden"
							/>

							<button
								type="submit"
								disabled={isPending}
								className="transition-all transform active:scale-90 outline-none peer-checked:text-primary text-zinc-700 hover:text-zinc-500 cursor-pointer"
							>
								{isPending ? (
									<Loader2 size={26} className="animate-spin text-zinc-500" />
								) : !!userTask.completedAt ? (
									<CheckCircle2 size={26} />
								) : (
									<Circle size={26} />
								)}
							</button>
						</label>
					</form>

					<div>
						<h3
							className={`font-bold transition-all ${
								!!userTask.completedAt
									? 'text-zinc-500 line-through'
									: 'text-white'
							}`}
						>
							{userTask.task.title}
						</h3>
						<span className="text-[10px] uppercase text-zinc-600 font-bold tracking-wider">
							Task #{userTask.task.order + 1}
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
						<ReactMarkdown>{userTask.task.content}</ReactMarkdown>
					</div>

					<form action={formAction} className="mt-8">
						<Button
							type="submit"
							disabled={isPending}
							className={`rounded-xl font-bold transition-all px-8 ${
								!!userTask.completedAt
									? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
									: 'bg-white text-black hover:bg-zinc-200'
							}`}
						>
							{isPending && <Loader2 size={16} className="animate-spin mr-2" />}
							{!!userTask.completedAt
								? 'Marcar como pendente'
								: 'Concluir esta etapa'}
						</Button>
					</form>
				</div>
			)}
		</div>
	)
}
