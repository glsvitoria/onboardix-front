'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	Bell,
	Search,
	ChevronDown,
	Loader2,
	User,
	FileText,
} from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

import { logoutAction } from '@/app/actions/logout'
import { globalSearchAction } from '@/app/actions/globalSearch'
import { UserWithOrganization } from '@/types/user'
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
} from './ui/alert-dialog'
import Link from 'next/link'

interface TopHeaderProps {
	user: UserWithOrganization
}

// Tipagem para os resultados unificados
interface SearchResult {
	id: string
	name: string
	type: 'USER' | 'TRACK'
}

export function TopHeader({ user }: TopHeaderProps) {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [loading, setLoading] = useState(false)
	const [results, setResults] = useState<SearchResult[]>([])
	const router = useRouter()

	const initials = user.fullName
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase()

	useEffect(() => {
		if (query.trim().length < 2) {
			setResults([])
			return
		}

		const delayDebounceFn = setTimeout(async () => {
			setLoading(true)
			try {
				const data = await globalSearchAction(query)
				setResults(data)
			} catch (error) {
				console.error('Erro na busca:', error)
				setResults([])
			} finally {
				setLoading(false)
			}
		}, 350)

		return () => clearTimeout(delayDebounceFn)
	}, [query])

	return (
		<header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/5 bg-[#09090b]/80 px-8 backdrop-blur-md">
			<div className="flex items-center gap-4">
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<div className="relative hidden md:block cursor-pointer">
							<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
							<div className="flex h-10 w-80 items-center rounded-xl border border-white/5 bg-zinc-900/50 pl-10 pr-4 text-sm text-zinc-500 transition-all hover:border-white/10">
								Buscar colaborador ou roteiro...
							</div>
						</div>
					</PopoverTrigger>

					<PopoverContent
						className="w-96 p-0 border-white/5 bg-zinc-900 shadow-2xl"
						align="start"
						sideOffset={10}
					>
						<div className="flex items-center border-b border-white/5 px-3">
							<Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
							<input
								className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500"
								placeholder="O que você está procurando?"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								autoFocus
							/>
							{loading && (
								<Loader2 className="h-4 w-4 animate-spin text-primary" />
							)}
						</div>

						<div className="max-h-[300px] overflow-y-auto p-2">
							{query.length < 2 && !loading && (
								<p className="p-4 text-center text-xs text-zinc-500">
									Digite pelo menos 2 caracteres...
								</p>
							)}

							{query.length >= 2 && results.length === 0 && !loading && (
								<p className="p-4 text-center text-xs text-zinc-500">
									Nenhum resultado encontrado.
								</p>
							)}

							{results.length > 0 && (
								<div className="space-y-1">
									<p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
										Resultados da busca
									</p>
									{results.map((item) => (
										<button
											key={`${item.type}-${item.id}`}
											className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-sm text-zinc-300 transition-all group"
											onClick={() => {
												const path =
													item.type === 'USER'
														? `/dashboard/colaboradores/${item.id}`
														: `/dashboard/roteiros/${item.id}`
												router.push(path)
												setOpen(false)
												setQuery('')
											}}
										>
											<div className="size-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-white/5 group-hover:border-primary/30 group-hover:text-primary transition-colors">
												{item.type === 'USER' ? (
													<User size={14} />
												) : (
													<FileText size={14} />
												)}
											</div>

											<div className="flex flex-col items-start">
												<span className="font-medium group-hover:text-white transition-colors">
													{item.name}
												</span>
												<span className="text-[10px] text-zinc-500">
													{item.type === 'USER'
														? 'Colaborador'
														: 'Roteiro de Onboarding'}
												</span>
											</div>
										</button>
									))}
								</div>
							)}
						</div>
					</PopoverContent>
				</Popover>
			</div>

			<div className="flex items-center gap-6">
				{/* <button className="relative p-2 text-zinc-400 transition-colors hover:text-zinc-100">
					<Bell size={20} />
					<span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
				</button>

				<div className="h-6 w-px bg-white/10" /> */}

				<DropdownMenu>
					<DropdownMenuTrigger className="flex items-center gap-3 outline-none group">
						<div className="text-right hidden sm:block">
							<p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
								{user.fullName}
							</p>
							<p className="mt-1 text-xs text-zinc-500 font-medium italic">
								{user.organization.name}
							</p>
						</div>

						<Avatar className="size-10 border border-white/10 transition-transform group-hover:scale-105">
							<AvatarImage src="" />
							<AvatarFallback className="bg-zinc-800 text-xs font-bold text-primary">
								{initials}
							</AvatarFallback>
						</Avatar>
						<ChevronDown size={14} className="text-zinc-500" />
					</DropdownMenuTrigger>

					<DropdownMenuContent
						align="end"
						className="w-56 rounded-2xl border-white/5 bg-zinc-900 p-2 text-zinc-100 shadow-2xl backdrop-blur-xl"
					>
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1 p-2">
								<p className="text-sm font-medium">{user.fullName}</p>
								<p className="text-xs text-zinc-500 truncate">{user.email}</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator className="bg-white/5" />
						<DropdownMenuItem
							asChild
							className="rounded-xl focus:bg-white/5 focus:text-primary cursor-pointer"
						>
							<Link href="/dashboard/perfil">Meu Perfil</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="rounded-xl focus:bg-white/5 focus:text-primary cursor-pointer">
							Configurações
						</DropdownMenuItem>
						<DropdownMenuSeparator className="bg-white/5" />

						<AlertDialog>
							<AlertDialogTrigger asChild>
								<DropdownMenuItem
									onSelect={(e) => e.preventDefault()}
									className="rounded-xl focus:bg-destructive/10 focus:text-destructive text-destructive/80 cursor-pointer font-medium"
								>
									Sair da conta
								</DropdownMenuItem>
							</AlertDialogTrigger>

							<AlertDialogContent className="bg-zinc-900 border-white/5 rounded-3xl">
								<AlertDialogHeader>
									<AlertDialogTitle className="text-zinc-100">
										Deseja realmente sair?
									</AlertDialogTitle>
									<AlertDialogDescription className="text-zinc-400">
										Sua sessão será encerrada e você precisará fazer login
										novamente para acessar o Onboardix.
									</AlertDialogDescription>
								</AlertDialogHeader>

								<AlertDialogFooter className="mt-4">
									<AlertDialogCancel className="bg-transparent border-white/5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100 rounded-xl">
										Cancelar
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => logoutAction()}
										className="bg-destructive text-white hover:bg-destructive/90 rounded-xl"
									>
										Encerrar Sessão
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}
