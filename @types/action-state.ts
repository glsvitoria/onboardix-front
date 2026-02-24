import { z } from 'zod'

export interface ActionState<T extends z.ZodType<any, any, any>> {
	success?: boolean
	errors?: z.inferFlattenedErrors<T>['fieldErrors'] & {
		global?: string
	}
	inputs?: Partial<z.infer<T>>
}
