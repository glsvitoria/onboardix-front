import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { Rocket, BookOpen, LogOut } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TaskItem } from './_components/task-item'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { LogoutButton } from '@/components/logout-button'

export default async function OnboardingPage() {
	const session = await getSession()

	// Rota que retorna o progresso: { percentage, total, completed, tasks: [...] }
	const data = await api.get<any>('/employees/my-progress').catch(() => null)

	if (!data || !data.tasks || data.tasks.length === 0) {
		return (
			<div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
				<Rocket size={48} className="text-zinc-700 mb-6" />
				<h1 className="text-2xl font-bold text-white mb-2">
					Preparando sua chegada...
				</h1>
				<p className="text-zinc-500 max-w-sm">
					Seu gestor ainda está organizando seu roteiro de boas-vindas. Assim
					que estiver pronto, você verá suas tarefas aqui.
				</p>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-black text-zinc-100">
			<nav className="border-b border-white/5 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
				<div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="size-8 bg-primary rounded-lg flex items-center justify-center font-bold text-black text-xl">
							O
						</div>
						<span className="font-bold tracking-tight">Onboardix</span>
					</div>

					<LogoutButton className='w-24' />
				</div>
			</nav>

			<main className="max-w-4xl mx-auto p-6 md:p-12 space-y-12">
				<section className="space-y-6">
					<div className="space-y-2">
						<h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
							Bem-vindo, {session?.user.fullName.split(' ')[0]}!
						</h1>
						<p className="text-zinc-500 text-lg">
							Esta é a sua trilha de integração.
						</p>
					</div>

					<div className="p-8 bg-zinc-900/40 border border-white/5 rounded-[32px] space-y-4">
						<div className="flex justify-between items-end">
							<div className="space-y-1">
								<span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
									Seu progresso atual
								</span>
								<p className="text-2xl font-bold text-white">
									{data.percentage}% completo
								</p>
							</div>
							<Badge className="bg-primary/10 text-primary border-none py-1 px-3">
								{data.completed}/{data.total} Tasks
							</Badge>
						</div>
						<Progress value={data.percentage} className="h-3 bg-zinc-800" />
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
						<BookOpen size={20} className="text-primary" />
						Seu Roteiro
					</h2>

					<div className="grid grid-cols-1 gap-3">
						{/* Mapeamos os itens. Como a task real está em 'task: [Object]', 
               passamos a estrutura correta para o TaskItem 
            */}
						{data.tasks
							.sort(
								(a: any, b: any) => (a.task?.order || 0) - (b.task?.order || 0)
							)
							.map((userTask: any) => (
								<TaskItem
									key={userTask.id}
									task={userTask.task}
									completed={!!userTask.completedAt}
									userTaskId={userTask.id} // ID da relação para marcar como feito
								/>
							))}
					</div>
				</section>
			</main>
		</div>
	)
}
