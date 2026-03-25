import { ServiceError } from '@/types/service-error'

interface HandleApiErrorProps {
	error: any
	inputs?: any
}

export const handleApiError = ({ error, inputs }: HandleApiErrorProps) => {
	const message =
		error instanceof ServiceError
			? error.message
			: 'Ocorreu um erro inesperado. Tente novamente.'

	return {
		errors: {
			global: message,
		},
		inputs,
		success: false,
		timestamp: Date.now(),
	}
}
