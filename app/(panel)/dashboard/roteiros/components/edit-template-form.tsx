'use client'

import { useActionState, useState } from 'react'
import { MarkdownEditor } from '@/components/ui/markdown-editor'
import { FormInput } from '@/components/ui/form-input'
import { Button } from '@/components/ui/button'
import { Trash2, Type } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { updateTemplateAction } from '@/app/(panel)/dashboard/_actions/update-template'
import { useActionToast } from '@/hooks/use-action-toast'

export function EditTemplateForm({
	id,
	initialData,
}: {
	id: string
	initialData: any
}) {
	const router = useRouter()

	const [state, formAction, isPending] = useActionState(updateTemplateAction, {
		inputs: initialData,
    timestamp: Date.now(),
		success: false,
	})

	const [tasks, setTasks] = useState<
		{ id?: string; title: string; content?: string }[]
	>(initialData.tasks || [{ title: '', content: '' }])

	const handleTaskChange = (
		index: number,
		field: 'title' | 'content',
		value: string,
	) => {
		const newTasks = [...tasks]
		newTasks[index][field] = value
		setTasks(newTasks)
	}

	const getTaskError = (index: number, field: 'title' | 'content') => {
		const key = `tasks.${index}.${field}`
		return (state?.errors as Record<string, string[]>)?.[key]
	}

	useActionToast(state, () => {
		router.push(`/dashboard/roteiros/${id}`)
	})

	return (
		<form action={formAction} className="space-y-8">
			<input type="hidden" name="templateId" defaultValue={id} />

			<FormInput
				label="Título"
				name="title"
				defaultValue={initialData.title}
				error={state.errors?.title}
				icon={Type}
			/>

			{tasks.map((task, index: number) => (
				<div
					key={index}
					className="bg-zinc-900/40 p-6 rounded-3xl border border-white/5 space-y-4 relative"
				>
					{tasks.length > 0 && (
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-zinc-600 hover:text-destructive hover:bg-destructive/10 transition-colors absolute top-2 right-4 z-20"
							onClick={() => {
								setTasks((prev) =>
									prev.filter((_, indexFilter) => indexFilter !== index),
								)
							}}
						>
							<Trash2 size={16} />
						</Button>
					)}

					<input
						type="hidden"
						name={`tasks[${index}][id]`}
						defaultValue={task?.id}
					/>

					<FormInput
						label={`Título da Atividade ${index + 1}`}
						name={`tasks[${index}][title]`}
						value={task.title}
						onChange={(e) => handleTaskChange(index, 'title', e.target.value)}
						error={getTaskError(index, 'title')}
						icon={Type}
					/>

					<MarkdownEditor
						value={task?.content || ''}
						onChange={(val) => handleTaskChange(index, 'content', val)}
						placeholder="Use # para títulos, ** para negrito, [link](url) para links..."
						error={getTaskError(index, 'content')}
					/>

					<input
						type="hidden"
						name={`tasks[${index}][content]`}
						value={task.content}
					/>
				</div>
			))}

			<div className="flex gap-4">
				<Button
					type="submit"
					isLoading={isPending}
					className="flex-1 bg-primary text-black font-bold"
				>
					Salvar Alterações
				</Button>
			</div>
		</form>
	)
}
