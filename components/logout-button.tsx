'use client'

import { LogOut } from 'lucide-react'
import { logoutAction } from '@/app/_actions/logout'
import { cn } from '@/lib/utils'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface LogoutButtonProps {
	className?: string
	variant?: 'nav' | 'ghost'
}

export function LogoutButton({
	className,
	variant = 'nav',
}: LogoutButtonProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				{variant === 'nav' ? (
					<button
						className={cn(
							'flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-zinc-500 hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer outline-none',
							className
						)}
					>
						<LogOut size={20} />
						Sair
					</button>
				) : (
					<Button
						variant="ghost"
						className={cn('text-zinc-500 hover:text-white gap-2', className)}
					>
						<LogOut size={18} /> Sair
					</Button>
				)}
			</DialogTrigger>

			<DialogContent className="bg-[#09090b] border-white/10 rounded-4xl max-w-sm">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold text-zinc-100">
						Sair da conta?
					</DialogTitle>
					<DialogDescription className="text-zinc-400">
						Sua sessão será encerrada e você precisará fazer login novamente
						para acessar seu onboarding.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="flex flex-row gap-3 mt-4">
					<DialogClose asChild>
						<Button variant="outline" className="flex-1 rounded-xl">
							Cancelar
						</Button>
					</DialogClose>

					<Button
						onClick={async () => await logoutAction()}
						variant="destructive"
						className="flex-1 rounded-xl"
					>
						Confirmar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
