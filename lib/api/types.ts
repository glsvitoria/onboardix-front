// src/lib/api/types.ts
export interface RequestOptions extends Omit<RequestInit, 'body'> {
	params?: Record<string, string | number>
	body?: any
}

export interface ApiError {
	message: string
	status: number
	errors?: Record<string, string[]>
}

export interface IApiAdapter {
	request<T>(endpoint: string, options?: RequestOptions): Promise<T>

	get<T>(endpoint: string, options?: RequestOptions): Promise<T>
	post<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T>
	put<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T>
	patch<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T>
	delete<T>(endpoint: string, options?: RequestOptions): Promise<T>
}
