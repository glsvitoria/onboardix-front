export class ServiceError {
	constructor(
		public readonly message: string = 'Ocorreu um erro inesperado',
		public readonly status: number = 500
	) {}
}
