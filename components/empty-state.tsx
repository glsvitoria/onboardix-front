interface EmptyStateProps {
	children: React.ReactNode
}

export const EmptyState = ({ children }: EmptyStateProps) => {
	return (
		<div className="col-span-full py-20 text-center bg-zinc-900/10 border border-dashed border-white/5 rounded-3xl text-zinc-500">
			{children}
		</div>
	)
}
