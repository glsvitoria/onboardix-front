interface HeaderPageProps {
	title: string
	description: string
}

export const HeaderPage = ({ description, title }: HeaderPageProps) => {
	return (
		<div>
			<h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
			<p className="text-zinc-500">{description}</p>
		</div>
	)
}
