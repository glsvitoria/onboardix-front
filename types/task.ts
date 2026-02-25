export interface Task {
	id: string
	title: string
	content: string
	order: number
	createdAt: Date
	updatedAt: Date | null
	deletedAt: Date | null
}
