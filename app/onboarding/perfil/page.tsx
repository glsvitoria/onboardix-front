import { getSession } from '@/lib/auth'
import { User, ShieldCheck, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ProfileForm } from '@/components/profile-form'
import { PasswordForm } from '@/components/password-form'

export default async function EmployeeProfilePage() {
	const session = await getSession()

	if (!session?.user) return null

	return (
		<div className="min-h-screen bg-black text-zinc-100">
			{/* Header Simplificado */}
			<nav className="border-b border-white/5 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
				<div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
					<Link
						href="/onboarding"
						className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
					>
						<ArrowLeft
							size={20}
							className="group-hover:-translate-x-1 transition-transform"
						/>
						<span className="text-sm font-medium">Voltar para a trilha</span>
					</Link>

					<div className="flex items-center gap-2">
						<div className="size-6 bg-primary rounded flex items-center justify-center font-bold text-black text-xs">
							O
						</div>
						<span className="font-bold tracking-tight text-sm">Onboardix</span>
					</div>
				</div>
			</nav>

			<main className="max-w-3xl mx-auto p-6 md:p-12 space-y-12">
				<header className="space-y-2">
					<h1 className="text-3xl font-bold text-white tracking-tight">
						Minhas Configurações
					</h1>
					<p className="text-zinc-500">
						Mantenha seus dados atualizados e sua conta segura.
					</p>
				</header>

				<div className="space-y-10">
					{/* Seção de Dados Pessoais */}
					<section className="space-y-6">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-xl bg-zinc-900 border border-white/5 text-primary">
								<User size={20} />
							</div>
							<h2 className="text-xl font-bold text-white">
								Informações Pessoais
							</h2>
						</div>

						<div className="p-1 border border-white/5 bg-zinc-950/50 rounded-[32px]">
							<div className="p-8 bg-zinc-900/40 rounded-[28px]">
								<ProfileForm user={session.user} />
							</div>
						</div>
					</section>

					{/* Seção de Segurança */}
					<section className="space-y-6">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-xl bg-zinc-900 border border-white/5 text-emerald-500">
								<ShieldCheck size={20} />
							</div>
							<h2 className="text-xl font-bold text-white">
								Segurança da Conta
							</h2>
						</div>

						<div className="p-1 border border-white/5 bg-zinc-950/50 rounded-[32px]">
							<div className="p-8 bg-zinc-900/40 rounded-[28px]">
								<PasswordForm />
							</div>
						</div>
					</section>
				</div>

				<footer className="pt-12 text-center">
					<p className="text-[11px] text-zinc-700 uppercase tracking-[0.2em] font-bold">
						Onboardix • Sistema de Integração de Colaboradores
					</p>
				</footer>
			</main>
		</div>
	)
}
