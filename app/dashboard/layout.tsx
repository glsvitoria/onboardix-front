import { TopHeader } from '@/components/dashboard/top-header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const data = await getSession()

	if (!data?.user) {
		redirect('/api/auth/logout') // Vai para uma rota que PODE deletar cookies
	}

	return (
		<div className="flex min-h-screen bg-[#09090b] text-zinc-100">
			<Sidebar user={data.user} />
			<div className="flex-1 flex flex-col">
				<TopHeader user={data.user} />
				<main className="p-8 animate-in fade-in duration-500">{children}</main>
			</div>
		</div>
	)
}
