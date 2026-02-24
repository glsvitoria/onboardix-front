'use client'

import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { logoutAction } from '@/app/actions/logout'

export function LogoutButton() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-zinc-500 hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
			>
				<LogOut size={20} />
				Sair
			</button>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
					<div className="bg-[#09090b] border border-white/10 p-6 rounded-3xl w-full max-w-sm">
						<h3 className="text-xl font-semibold text-zinc-100 mb-2">
							Sair da conta?
						</h3>
						<p className="text-zinc-400 mb-6">
							Sua sessão será encerrada e você voltará à tela de login.
						</p>

						<div className="flex gap-3">
							<button
								onClick={() => setIsOpen(false)}
								className="flex-1 px-4 py-2 rounded-xl bg-white/5 text-zinc-300 hover:bg-white/10 cursor-pointer"
							>
								Cancelar
							</button>
							<button
								onClick={async () => await logoutAction()}
								className="flex-1 px-4 py-2 rounded-xl bg-destructive text-white hover:bg-destructive/90 cursor-pointer"
							>
								Confirmar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
