import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { UserPlus, Mail, Clock, ChevronRight, User } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { listEmployeesService } from '@/services/employees/list'
import { listInvitationsService } from '@/services/invitations/list'
import { Pagination } from '@/components/pagination'
import { Invitation } from '@/types/invitation'
import { HeaderPage } from '../_components/header'
import { ErrorState } from '@/components/error-state'
import { ServiceError } from '@/types/service-error'
import { EmptyState } from '@/components/empty-state'

const ITEMS_PER_PAGE_EMPLOYEES = 6
const ITEMS_PER_PAGE_INVITATIONS = 6

export default async function CollaboratorsPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>
}) {
	const params = await searchParams
	const currentPage = Number(params.page) || 1

	const [employees, invitations] = await Promise.all([
		listEmployeesService({
			init: currentPage - 1,
			limit: ITEMS_PER_PAGE_EMPLOYEES,
		}).catch((err: ServiceError) => ({
			items: [],
			total: 0,
			message: err.message,
		})),
		listInvitationsService({
			params: {
				init: currentPage - 1,
				limit: ITEMS_PER_PAGE_INVITATIONS,
			},
		}).catch((err: ServiceError) => ({
			items: [],
			total: 0,
			message: err.message,
		})),
	])

	const isEmployeesError = 'message' in employees
	const isInvitationsError = 'message' in invitations

	return (
		<div className="p-8 max-w-7xl mx-auto space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<HeaderPage
					title="Colaboradores"
					description="Gerencie seus colaboradores ativos e acompanhe os convites
						pendentes."
				/>

				<Link href="/dashboard/colaboradores/convidar">
					<Button className="w-40">
						<UserPlus size={18} />
						Novo Convite
					</Button>
				</Link>
			</div>

			<Tabs defaultValue="active" className="space-y-6">
				<TabsList className="bg-zinc-900/50 border border-white/5 p-1 rounded-xl">
					<TabsTrigger
						value="active"
						className="rounded-lg px-6 data-[state=active]:bg-zinc-800"
					>
						<Link href="?page=1" scroll={false}>
							Colaboradores ({employees.total})
						</Link>
					</TabsTrigger>
					<TabsTrigger
						value="pending"
						className="rounded-lg px-6 data-[state=active]:bg-zinc-800"
					>
						<Link href="?page=1" scroll={false}>
							Convites Pendentes ({invitations.total})
						</Link>
					</TabsTrigger>
				</TabsList>

				<TabsContent value="active" className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{isEmployeesError ? (
							<ErrorState to="/dashboard/colaboradores">
								{employees.message}
							</ErrorState>
						) : employees.items.length > 0 ? (
							employees.items.map((employee) => {
								const taskCount = employee.onboarding?.taskCount || 0
								const hasStarted = employee.onboarding?.status !== 'NOT_STARTED'
								const isPendingAssignment = taskCount === 0

								return (
									<div
										key={employee.id}
										className={`bg-zinc-900/40 border ${
											isPendingAssignment
												? 'border-amber-500/20'
												: 'border-white/5'
										} p-6 rounded-3xl hover:border-primary/30 transition-all flex flex-col group relative overflow-hidden`}
									>
										{hasStarted && (
											<div className="absolute -right-10 -top-10 size-32 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors" />
										)}
										{isPendingAssignment && (
											<div className="absolute -right-10 -top-10 size-32 bg-amber-500/5 blur-3xl rounded-full" />
										)}

										<div className="flex justify-between items-start mb-6">
											<div className="flex items-center gap-4">
												<div className="size-12 rounded-2xl bg-zinc-800 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-all">
													<User size={24} />
												</div>
												<div>
													<h3 className="font-bold text-zinc-100 leading-tight">
														{employee.fullName.split(' ')[0]}{' '}
														{employee.fullName.split(' ').slice(-1)}
													</h3>
													<span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
														{employee.role}
													</span>
												</div>
											</div>

											<Badge
												className={`border-none ${
													isPendingAssignment
														? 'bg-amber-500/10 text-amber-500'
														: hasStarted
														? 'bg-green-500/10 text-green-500'
														: 'bg-zinc-800 text-zinc-500'
												}`}
											>
												{isPendingAssignment
													? 'Sem trilha'
													: hasStarted
													? 'Em progresso'
													: 'Não iniciado'}
											</Badge>
										</div>

										<div className="space-y-4 mb-6 flex-1">
											<div className="flex items-center text-sm text-zinc-400">
												<Mail size={14} className="mr-2 shrink-0" />
												<span className="truncate">{employee.email}</span>
											</div>

											{!isPendingAssignment ? (
												<div className="space-y-1.5">
													<div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-600">
														<span>Progresso Onboarding</span>
														<span className={hasStarted ? 'text-primary' : ''}>
															{employee.onboarding.progress}
														</span>
													</div>
													<div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
														<div
															className="h-full bg-primary transition-all duration-500"
															style={{ width: employee.onboarding.progress }}
														/>
													</div>
												</div>
											) : (
												<div className="py-2 px-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
													<p className="text-[11px] text-amber-500/80 leading-relaxed font-medium">
														Este colaborador ainda não possui tarefas atribuídas
														para iniciar o onboarding.
													</p>
												</div>
											)}
										</div>

										<Button
											asChild
											variant="secondary"
											className={`w-full border rounded-xl gap-2 group/btn ${
												isPendingAssignment
													? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/20'
													: 'bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 border-white/5'
											}`}
										>
											<Link href={`/dashboard/colaboradores/${employee.id}`}>
												{isPendingAssignment
													? 'Atribuir Roteiro'
													: 'Ver Perfil Detalhado'}
												<ChevronRight
													size={16}
													className="group-hover/btn:translate-x-1 transition-transform"
												/>
											</Link>
										</Button>
									</div>
								)
							})
						) : (
							<EmptyState>Nenhum colaborador ativo encontrado.</EmptyState>
						)}
					</div>

					<Pagination
						totalItems={employees.total}
						itemsPerPage={ITEMS_PER_PAGE_EMPLOYEES}
						currentPage={currentPage}
					/>
				</TabsContent>

				<TabsContent value="pending">
					<div className="bg-zinc-900/20 border border-white/5 rounded-3xl overflow-hidden">
						{isInvitationsError ? (
							<ErrorState to="/dashboard/colaboradores">
								{invitations.message}
							</ErrorState>
						) : invitations.items.length ? (
							<table className="w-full text-left border-collapse">
								<thead>
									<tr className="border-b border-white/5 bg-white/5">
										<th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
											Convidado
										</th>
										<th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
											Enviado em
										</th>
										<th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
											Expira em
										</th>
										{/* <th className="px-6 py-4"></th> */}
									</tr>
								</thead>
								<tbody className="divide-y divide-white/5">
									{invitations.items.map((invitation: Invitation) => (
										<tr key={invitation.id} className="transition-colors group">
											<td className="px-6 py-4 text-sm font-medium text-zinc-200">
												{invitation.email}
											</td>
											<td className="px-6 py-4 text-sm text-zinc-400">
												{new Date(invitation.createdAt).toLocaleDateString(
													'pt-BR'
												)}
											</td>
											<td className="px-6 py-4">
												<Badge
													variant="outline"
													className="bg-amber-500/10 text-amber-500 border-none gap-1.5 text-[10px]"
												>
													<Clock size={12} />
													{new Date(invitation.expiresAt).toLocaleDateString(
														'pt-BR'
													)}
												</Badge>
											</td>
											{/* <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-zinc-500 hover:text-primary hover:bg-primary/5"
                      >
                        Reenviar
                      </Button>
                    </td> */}
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<EmptyState>
								Todos os convites foram aceitos ou não há convites pendentes.
							</EmptyState>
						)}
					</div>

					<Pagination
						totalItems={invitations.total}
						itemsPerPage={ITEMS_PER_PAGE_INVITATIONS}
						currentPage={currentPage}
					/>
				</TabsContent>
			</Tabs>
		</div>
	)
}
