import { Organization } from './organization'
import { UserTaskWithTask } from './user-task'

export interface User {
	id: string
	email: string
	fullName: string
	role: UserRole
	createdAt: Date
	updatedAt: Date | null
	deletedAt: Date | null
}

export enum UserRole {
	ADMIN = 'ADMIN',
	OWNER = 'OWNER',
	MEMBER = 'MEMBER',
}

export interface UserWithOrganization extends User {
	organization: Organization
}

export interface UserWithProgress
	extends Pick<User, 'id' | 'fullName' | 'email'> {
	progress: number
	stats: {
		total: number
		completed: number
		pending: number
	}
	userTasks: UserTaskWithTask[]
}
