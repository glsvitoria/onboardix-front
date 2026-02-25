import { Organization } from './organization'

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
	ADMIN,
	OWNER,
	MEMBER,
}

export interface UserWithOrganization extends User {
	organization: Organization
}
