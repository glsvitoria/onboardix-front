import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft, Calendar, ListChecks, Edit } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { notFound } from 'next/navigation'
import { DeleteTemplateButton } from '../components/delete-template-button'
import { BackButton } from '@/components/back-button'
import { showTemplatesService } from '@/services/templates/show'

interface PageProps {
	params: Promise<{ id: string }>
}

export default async function TemplateDetailsPage({ params }: PageProps) {
	const { id } = await params

	const template = await showTemplatesService({
		params: {
			templateId: id,
		},
	})

	if (!template) {
		notFound()
	}

	return (
		<div className="max-w-5xl mx-auto p-8">
			<div className="flex items-center justify-between mb-4">
				<BackButton to="/dashboard/roteiros">Voltar para Roteiros</BackButton>

				<div className="flex items-center gap-3">
					<DeleteTemplateButton id={id} redirectTo="/dashboard/roteiros" />

					<Link href={`/dashboard/roteiros/${id}/edicao`}>
						<Button variant="outline">
							<Edit size={16} className="mr-2" /> Editar Roteiro
						</Button>
					</Link>
				</div>
			</div>

			{/* Hero Section */}
			<header className="space-y-4 mb-12">
				<div className="flex items-center gap-3">
					<Badge
						variant="secondary"
						className="bg-primary/10 text-primary border-primary/20"
					>
						Roteiro de Onboarding
					</Badge>
					<div className="flex items-center text-zinc-500 text-xs gap-1">
						<Calendar size={14} />
						{new Date(template.createdAt).toLocaleDateString('pt-BR')}
					</div>
				</div>

				<h1 className="text-4xl font-bold text-white tracking-tight leading-tight">
					{template.title}
				</h1>

				{template.description && (
					<p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
						{template.description}
					</p>
				)}
			</header>

			<Separator className="bg-white/5 mb-12" />

			{/* Conteúdo das Atividades */}
			<div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
				<div className="space-y-16">
					{template.tasks.map((task: any, index: number) => (
						<section key={task.id} className="relative pl-12 group">
							{/* Linha do tempo visual */}
							<div className="absolute left-[18px] top-0 bottom-0 w-px bg-zinc-800 group-last:bg-transparent" />
							<div className="absolute left-0 top-0 size-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-300 z-10">
								{index + 1}
							</div>

							<div className="space-y-4">
								<h2 className="text-2xl font-semibold text-white group-hover:text-primary transition-colors">
									{task.title}
								</h2>

								<div className="prose prose-invert prose-zinc max-w-none bg-zinc-900/30 p-6 rounded-2xl border border-white/5">
									<ReactMarkdown>{task.content}</ReactMarkdown>
								</div>
							</div>
						</section>
					))}
				</div>

				{/* Sidebar de Resumo */}
				<aside className="space-y-6">
					<div className="sticky top-8 bg-zinc-900/50 border border-white/5 rounded-3xl p-6">
						<h3 className="flex items-center gap-2 font-bold text-white mb-4 text-sm uppercase tracking-wider">
							<ListChecks size={18} className="text-primary" />
							Índice das Etapas
						</h3>
						<nav className="space-y-2">
							{template.tasks.map((task: any, index: number) => (
								<div
									key={task.id}
									className="flex items-center gap-3 text-sm text-zinc-400 py-1"
								>
									<span className="text-[10px] font-mono text-zinc-600">
										0{index + 1}
									</span>
									<span className="truncate">{task.title}</span>
								</div>
							))}
						</nav>
					</div>
				</aside>
			</div>
		</div>
	)
}
