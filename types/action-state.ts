import { z } from 'zod'

export interface ActionState<T extends z.ZodType<any, any, any>> {
	errors?: z.inferFlattenedErrors<T>['fieldErrors'] & {
		global?: string
	}
	inputs?: Partial<z.infer<T>>
	message?: string
	data?: any
	success: boolean
	timestamp: number
}
