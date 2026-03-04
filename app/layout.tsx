import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
	title: 'Onboardix - Reduza o tempo de ramp-up do seu time em 40%',
	description:
		'Automatize o onboarding de novos funcionários. Do contrato assinado ao primeiro dia de produtividade, sem planilhas ou mensagens perdidas no Slack.',
	generator: 'v0.app',
	icons: {
		icon: [
			{
				url: '/icon.svg',
				type: 'image/svg+xml',
			},
		],
		apple: '/apple-icon.png',
	},
}

export const viewport: Viewport = {
	themeColor: '#1a1a2e',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={`${inter.variable} font-sans antialiased`}>
				{children}
				<Toaster />
				<Analytics />
			</body>
		</html>
	)
}
