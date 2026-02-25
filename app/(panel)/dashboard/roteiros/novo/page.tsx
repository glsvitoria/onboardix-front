'use client'

import { useActionState, useEffect, useState } from 'react'
import { FormInput } from '@/components/ui/form-input'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, FileText, Type, ListPlus, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { createTemplateAction } from '@/app/actions/create-template'
import { MarkdownEditor } from '@/components/ui/markdown-editor'
import { redirect } from 'next/navigation'

export default function NewTemplatePage() {
	const [state, formAction, isPending] = useActionState(
		createTemplateAction,
		null
	)

	const [tasks, setTasks] = useState([{ title: '', content: '' }])

	const addTask = () => setTasks([...tasks, { title: '', content: '' }])

	const removeTask = (index: number) => {
		if (tasks.length > 1) {
			setTasks(tasks.filter((_, i) => i !== index))
		}
	}

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
		if (state?.success) {
			redirect('/dashboard/roteiros')
		}
	}, [state])

	return (
		<div className="p-8 max-w-3xl mx-auto">
			<div className="mb-8">
				<Link
					href="/dashboard/templates"
					className="text-sm text-zinc-500 hover:text-primary transition-colors"
				>
					← Voltar para listagem
				</Link>
				<h1 className="text-3xl font-bold text-white mt-2">Novo Roteiro</h1>
				<p className="text-zinc-500">
					Defina o título e as etapas desta trilha de onboarding.
				</p>
			</div>

			<form action={formAction} className="space-y-8">
				<div className="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl space-y-4">
					<div className="flex items-center gap-2 mb-2 text-primary">
						<FileText size={18} />
						<span className="text-xs font-bold uppercase tracking-wider">
							Informações Gerais
						</span>
					</div>

					<FormInput
						label="Título do Roteiro"
						name="title"
						icon={Type}
						placeholder="Ex: Onboarding de Engenharia"
						error={state?.errors?.title}
						defaultValue={state?.inputs?.title}
					/>

					<FormInput
						label="Descrição (Opcional)"
						name="description"
						icon={FileText}
						placeholder="Do que se trata este roteiro?"
						error={state?.errors?.description}
						defaultValue={state?.inputs?.description}
					/>
				</div>

				{/* Listagem de Tarefas */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 text-primary">
							<ListPlus size={18} />
							<span className="text-xs font-bold uppercase tracking-wider">
								Etapas do Roteiro
							</span>
						</div>
						<Button
							type="button"
							variant="outline"
							onClick={addTask}
							className="rounded-xl border-white/10 hover:bg-white/5 text-xs h-8"
						>
							<Plus size={14} className="mr-1" /> Adicionar Etapa
						</Button>
					</div>

					{tasks.map((task, index) => (
						<div
							key={index}
							className="group relative bg-zinc-900/40 border border-white/5 p-6 rounded-3xl animate-in fade-in slide-in-from-top-2 duration-300"
						>
							<div className="absolute -left-3 top-8 size-6 bg-zinc-800 border border-white/10 rounded-full flex items-center justify-center text-[10px] font-bold text-zinc-500">
								{index + 1}
							</div>

							<div className="grid gap-4">
								<div className="flex gap-4 items-start">
									<div className="flex-1">
										<FormInput
											label={`Título da Atividade ${index + 1}`}
											name={`tasks[${index}][title]`}
											icon={Type}
											value={task.title}
											onChange={(e) =>
												handleTaskChange(index, 'title', e.target.value)
											}
											placeholder="O que deve ser feito?"
											error={getTaskError(index, 'title')}
										/>
									</div>

									{tasks.length > 1 && (
										<Button
											type="button"
											variant="ghost"
											onClick={() => removeTask(index)}
											className="mt-6 text-zinc-600 hover:text-destructive transition-colors"
										>
											<Trash2 size={18} />
										</Button>
									)}
								</div>

								<div className="space-y-2">
									<label className="text-xs font-medium uppercase text-muted-foreground ml-1">
										Conteúdo (Suporta Markdown)
									</label>

									{/* Campo oculto para o FormData capturar o valor no submit */}
									<input
										type="hidden"
										name={`tasks[${index}][content]`}
										value={task.content}
									/>

									<MarkdownEditor
										value={task.content}
										onChange={(val) => handleTaskChange(index, 'content', val)}
										placeholder="Use # para títulos, ** para negrito, [link](url) para links..."
										error={getTaskError(index, 'content')}
									/>
								</div>
							</div>
						</div>
					))}
				</div>

				{state?.errors?.global && (
					<div className="p-4 rounded-2xl bg-destructive/10 text-destructive text-sm text-center font-medium">
						{state.errors.global}
					</div>
				)}

				<div className="flex gap-4">
					<Button
						type="submit"
						disabled={isPending}
						className="flex-1 rounded-2xl h-12 bg-primary hover:bg-primary/90 text-black font-bold"
					>
						{isPending ? <Loader2 className="animate-spin" /> : 'Criar Roteiro'}
					</Button>
					<Button
						asChild
						variant="ghost"
						className="rounded-2xl h-12 px-8 border border-white/5"
					>
						<Link href="/dashboard/roteiros">Cancelar</Link>
					</Button>
				</div>
			</form>
		</div>
	)
}
