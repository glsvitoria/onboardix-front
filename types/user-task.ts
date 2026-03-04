import { Task } from './task'

export interface UserTask {
	id: string
	completedAt: Date | null
	createdAt: Date
	updatedAt: Date | null
}

export interface UserTaskWithTask extends UserTask {
	task: Task
}
