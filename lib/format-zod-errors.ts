import z from 'zod'

export const formatZodErrors = <T>(
	validatedFields: z.SafeParseReturnType<any, T>
) => {
	const fieldErrors: Record<string, string[]> = {}

	validatedFields.error?.issues.forEach((issue) => {
		const path = issue.path.join('.')
		fieldErrors[path] = [issue.message]
	})

	return fieldErrors
}
