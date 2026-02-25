import { TopHeader } from '@/components/top-header'
import { Sidebar } from '@/components/sidebar'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const data = await getSession()

	if (!data?.user) {
		redirect('/api/auth/logout')
	}

	return (
		<div className="flex min-h-screen bg-[#09090b] text-zinc-100">
			<Sidebar />
			<div className="flex-1 flex flex-col">
				<TopHeader user={data.user} />
				<main className="p-8 animate-in fade-in duration-500">{children}</main>
			</div>
		</div>
	)
}
