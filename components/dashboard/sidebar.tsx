import { UserWithOrganization } from '@/@types/user'
import { Home, LayoutGrid, Users, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { LogoutButton } from '../logout-button'

export function Sidebar({ user }: { user: UserWithOrganization }) {
	const menuItems = [
		{ name: 'Início', icon: Home, href: '/dashboard', active: true },
		{ name: 'Roteiros', icon: LayoutGrid, href: '/dashboard/templates' },
		{ name: 'Equipe', icon: Users, href: '/dashboard/team' },
		{ name: 'Ajustes', icon: Settings, href: '/dashboard/settings' },
	]

	return (
		<aside className="w-64 border-right border-white/5 flex flex-col p-6 bg-[#09090b]">
			<div className="mb-10 px-2">
				<span className="font-bold tracking-tighter text-xl">ONBOARDIX</span>
			</div>

			<nav className="flex-1 space-y-2">
				{menuItems.map((item) => (
					<Link
						key={item.name}
						href={item.href}
						className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
							item.active
								? 'bg-primary/10 text-primary font-medium'
								: 'text-zinc-500 hover:bg-white/5 hover:text-zinc-200'
						}`}
					>
						<item.icon size={20} />
						{item.name}
					</Link>
				))}
			</nav>

			<div className="pt-6 border-t border-white/5">
				<LogoutButton />
			</div>
		</aside>
	)
}
