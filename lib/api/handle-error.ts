interface HandleApiErrorProps {
	error: any
	inputs?: any
}

export const handleApiError = ({ error, inputs }: HandleApiErrorProps) => {
	return {
		errors: {
			global: error.message,
		},
		inputs,
		success: false,
	}
}
