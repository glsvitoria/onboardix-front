import { UserWithOrganization } from './user'

export interface AuthenticatedUser {
	user: UserWithOrganization
	token: string
}
