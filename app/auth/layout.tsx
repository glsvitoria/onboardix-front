import Link from 'next/link'

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-1/2 left-1/2 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
			</div>

			<div className="relative z-10 w-full max-w-100">
				<div className="mb-8 text-center">
					<Link
						href="/"
						className="inline-block font-bold tracking-tighter text-2xl"
					>
						ONBOARDIX
					</Link>
				</div>
				{children}
			</div>
		</main>
	)
}
