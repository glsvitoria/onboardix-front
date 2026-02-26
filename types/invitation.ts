export interface Invitation {
	id: string
	organizationId: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
	email: string
	role: 'OWNER' | 'ADMIN' | 'MEMBER'
	token: string
	expiresAt: Date
}
