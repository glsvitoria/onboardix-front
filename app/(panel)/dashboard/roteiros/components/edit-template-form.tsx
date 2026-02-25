'use client'

import { useActionState, useState, useEffect } from 'react'
import { MarkdownEditor } from '@/components/ui/markdown-editor'
import { FormInput } from '@/components/ui/form-input'
import { Button } from '@/components/ui/button'
import { Loader2, Type } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { updateTemplateAction } from '@/app/actions/update-template'

export function EditTemplateForm({
	id,
	initialData,
}: {
	id: string
	initialData: any
}) {
	const router = useRouter()

	const updateActionWithId = updateTemplateAction.bind(null, id)
	const [state, formAction, isPending] = useActionState(updateActionWithId, {
		inputs: initialData,
	})

	const [tasks, setTasks] = useState(
		initialData.tasks || [{ title: '', content: '' }]
	)

	const handleTaskChange = (
		index: number,
		field: 'title' | 'content',
		value: string
	) => {
		const newTasks = [...tasks]
		newTasks[index][field] = value
		setTasks(newTasks)
	}

	const getTaskError = (index: number, field: 'title' | 'content') => {
		const key = `tasks.${index}.${field}`
		return (state?.errors as Record<string, string[]>)?.[key]
	}

	useEffect(() => {
		if (state.success) {
			router.push(`/dashboard/roteiros/${id}`)
		}
	}, [state, id, router])

	return (
		<form action={formAction} className="space-y-8">
			{/* Campos de Título e Descrição com defaultValue={initialData.title} */}
			<FormInput
				label="Título"
				name="title"
				defaultValue={initialData.title}
				error={state.errors?.title}
				icon={Type}
			/>

			{/* Loop de Tasks similar ao da criação */}
			{tasks.map((task: any, index: number) => (
				<div
					key={index}
					className="bg-zinc-900/40 p-6 rounded-3xl border border-white/5 space-y-4"
				>
					<FormInput
						label={`Título da Atividade ${index + 1}`}
						name={`tasks[${index}][title]`}
						value={task.title}
						onChange={(e) => handleTaskChange(index, 'title', e.target.value)}
						error={getTaskError(index, 'title')}
						icon={Type}
					/>

					<MarkdownEditor
						value={task.content}
						onChange={(val) => handleTaskChange(index, 'content', val)}
						placeholder="Use # para títulos, ** para negrito, [link](url) para links..."
						error={getTaskError(index, 'content')}
					/>
					{/* Campo hidden para o FormData pegar o conteúdo do Markdown */}
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
					disabled={isPending}
					className="flex-1 bg-primary text-black font-bold"
				>
					{isPending ? (
						<Loader2 className="animate-spin" />
					) : (
						'Salvar Alterações'
					)}
				</Button>
			</div>
		</form>
	)
}
