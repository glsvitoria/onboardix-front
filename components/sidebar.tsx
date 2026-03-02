'use client'

import { Home, LayoutGrid, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutButton } from './logout-button'

export function Sidebar() {
	const pathname = usePathname()

	const menuItems = [
		{ name: 'Início', icon: Home, href: '/dashboard' },
		{ name: 'Roteiros', icon: LayoutGrid, href: '/dashboard/roteiros' },
		{ name: 'Equipe', icon: Users, href: '/dashboard/colaboradores' },
	]

	return (
		<aside className="sticky top-0 h-screen w-64 border-r border-white/5 flex flex-col p-6 bg-[#09090b]">
			<div className="mb-10 px-2">
				<span className="font-bold tracking-tighter text-xl text-white uppercase">
					ONBOARDIX
				</span>
			</div>

			<nav className="flex-1 space-y-2 overflow-y-auto">
				{/* Adicionei overflow-y-auto acima para caso o menu cresça muito */}
				{menuItems.map((item) => {
					const isActive =
						pathname === item.href ||
						(item.href !== '/dashboard' && pathname.startsWith(item.href))

					return (
						<Link
							key={item.name}
							href={item.href}
							className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
								isActive
									? 'bg-primary/10 text-primary font-semibold'
									: 'text-zinc-500 hover:bg-white/5 hover:text-zinc-200'
							}`}
						>
							<item.icon
								size={20}
								className={isActive ? 'text-primary' : 'text-zinc-500'}
							/>
							{item.name}
						</Link>
					)
				})}
			</nav>

			<div className="pt-6 border-t border-white/5 mt-auto">
				<LogoutButton />
			</div>
		</aside>
	)
}
