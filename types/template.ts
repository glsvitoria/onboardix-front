import { Task } from './task'

export interface Template {
	id: string
	title: string
	description?: string
	createdAt: Date
	updatedAt: Date | null
	deletedAt: Date | null
}

export interface TemplateWithTasks extends Template {
	tasks: Task[]
}
