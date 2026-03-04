'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme()

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			richColors
			className="toaster group"
			toastOptions={{
				classNames: {
					// Base: Fundo bem escuro, borda padrão discreta
					toast:
						'group bg-zinc-950 text-white border-zinc-800 shadow-2xl rounded-xl flex items-center gap-3 p-4',
					description: 'text-zinc-500 text-xs font-normal',

					// Variantes: Fundo continua escuro, mas o TEXTO e a BORDA brilham com a cor do estado
					error: '!text-red-500 !border-red-500/50 !bg-zinc-950',
					success: '!text-emerald-500 !border-emerald-500/50 !bg-zinc-950',
					warning: '!text-yellow-500 !border-yellow-500/50 !bg-zinc-950',
					info: '!text-blue-500 !border-blue-500/50 !bg-zinc-950',
				},
			}}
			style={
				{
					'--success-icon': '#10b981',
					'--error-icon': '#ef4444',
					'--loading-icon': '#71717a',
				} as React.CSSProperties
			}
			{...props}
		/>
	)
}

export { Toaster }
