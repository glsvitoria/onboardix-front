import { Bell, Search, ChevronDown } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { logoutAction } from '@/app/actions/logout'
import { UserWithOrganization } from '@/@types/user'

interface TopHeaderProps {
	user: UserWithOrganization
}

export function TopHeader({ user }: TopHeaderProps) {
	// Pega as iniciais do nome para o Fallback do Avatar
	const initials = user.fullName
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase()

	return (
		<header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/5 bg-[#09090b]/80 px-8 backdrop-blur-md">
			<div className="flex items-center gap-4">
				<div className="relative hidden md:block">
					<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
					<input
						type="text"
						placeholder="Buscar colaborador ou roteiro..."
						className="h-10 w-64 rounded-xl border border-white/5 bg-zinc-900/50 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
					/>
				</div>
			</div>

			{/* Lado Direito: Notificações e Perfil */}
			<div className="flex items-center gap-6">
				<button className="relative p-2 text-zinc-400 transition-colors hover:text-zinc-100">
					<Bell size={20} />
					<span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
				</button>

				<div className="h-6 w-px bg-white/10" />

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
							<AvatarImage src="" />{' '}
							{/* Se você tiver URL de imagem no banco */}
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
						<DropdownMenuItem className="rounded-xl focus:bg-white/5 focus:text-primary cursor-pointer">
							Meu Perfil
						</DropdownMenuItem>
						<DropdownMenuItem className="rounded-xl focus:bg-white/5 focus:text-primary cursor-pointer">
							Configurações da Empresa
						</DropdownMenuItem>
						<DropdownMenuSeparator className="bg-white/5" />
						<DropdownMenuItem
							onClick={() => logoutAction()}
							className="rounded-xl focus:bg-destructive/10 focus:text-destructive text-destructive/80 cursor-pointer font-medium"
						>
							Sair da conta
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}
