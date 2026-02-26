export interface Employee {
	id: string
	fullName: string
	email: string
	role: 'OWNER' | 'ADMIN' | 'MEMBER'
	createdAt: Date
	onboarding: {
		status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
		progress: string
		taskCount: number
	}
}
