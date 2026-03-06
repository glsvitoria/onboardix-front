import { getSession } from '@/lib/auth'
import { Building2, User, ShieldCheck } from 'lucide-react'
import { PasswordForm } from '../../../../components/password-form'
import { ProfileForm } from '../../../../components/profile-form'
import { UserRole } from '@/types/user'

export default async function ProfilePage() {
	const session = await getSession()

	const formatRole = (role?: UserRole) => {
		switch (role) {
			case UserRole.ADMIN:
				return 'ADMINISTRADOR'
			case UserRole.OWNER:
				return 'PROPRIETÁRIO'
			default:
				return 'COLABORADOR'
		}
	}

	return (
		<div>
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
				<p className="text-zinc-500 mt-2">
					Gerencie suas informações pessoais e configurações de segurança.
				</p>
			</div>

			<div className="grid gap-8">
				<section className="bg-[#09090b] border border-white/5 rounded-3xl p-8">
					<div className="flex items-center gap-3 mb-8">
						<div className="p-2 rounded-lg bg-primary/10 text-primary">
							<User size={20} />
						</div>
						<h2 className="text-xl font-semibold text-white">
							Informações Básicas
						</h2>
					</div>
					<ProfileForm user={session?.user} />
				</section>

				<section className="bg-[#09090b] border border-white/5 rounded-3xl p-8 opacity-80">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
							<Building2 size={20} />
						</div>
						<h2 className="text-xl font-semibold text-white">
							Sua Organização
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
								Nome da Empresa
							</label>
							<p className="mt-2 text-zinc-200 font-medium">
								{session?.user.organization.name}
							</p>
						</div>
						<div>
							<label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
								Seu Cargo / Role
							</label>
							<p className="mt-2 text-zinc-200 font-medium">
								{formatRole(session?.user.role)}
							</p>
						</div>
					</div>
					<p className="mt-6 text-[11px] text-zinc-600 italic">
						* Para alterar dados da organização, entre em contato com o suporte.
					</p>
				</section>

				<section className="bg-[#09090b] border border-white/5 rounded-3xl p-8">
					<div className="flex items-center gap-3 mb-8">
						<div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
							<ShieldCheck size={20} />
						</div>
						<h2 className="text-xl font-semibold text-white">Segurança</h2>
					</div>
					<PasswordForm />
				</section>
			</div>
		</div>
	)
}
