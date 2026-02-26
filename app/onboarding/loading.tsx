export default function OnboardingLoading() {
	return (
		<div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
			<div className="w-full max-w-md space-y-8 animate-pulse">
				{/* Skeleton do Header */}
				<div className="space-y-4">
					<div className="h-12 w-48 bg-zinc-900 rounded-2xl" />
					<div className="h-6 w-64 bg-zinc-900/50 rounded-xl" />
				</div>

				{/* Skeleton do Card de Progresso */}
				<div className="h-32 w-full bg-zinc-900/40 border border-white/5 rounded-[32px]" />

				{/* Skeletons das Tasks */}
				<div className="space-y-4">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="h-20 w-full bg-zinc-900/20 border border-white/5 rounded-3xl"
						/>
					))}
				</div>
			</div>
		</div>
	)
}
