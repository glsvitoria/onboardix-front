// src/lib/api/fetch-adapter.ts
import { cookies } from 'next/headers'
import { ACCESS_TOKEN } from '@/common/token'
import { IApiAdapter, RequestOptions } from './types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchAdapter: IApiAdapter = {
	async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
		const { params, body, headers, ...rest } = options

		const url = new URL(`${BASE_URL}${endpoint}`)

		if (params) {
			Object.entries(params).forEach(([key, val]) =>
				url.searchParams.append(key, String(val))
			)
		}

		const token = (await cookies()).get(ACCESS_TOKEN)?.value

		const config: RequestInit = {
			...rest,
			headers: {
				'Content-Type': 'application/json',
				...(token && { Authorization: `Bearer ${token}` }),
				...headers,
			},
			body: body ? JSON.stringify(body) : undefined,
		}

		const response = await fetch(url.toString(), config)

		if (!response.ok) {
			const errorData = await response.json()

			throw {
				message:
					errorData.message ||
					'Falha na conexão com o servidor. Tente novamente.',
				status: response.status,
				errors: errorData.errors,
			}
		}

		return response.json()
	},

	get<T>(endpoint: string, options?: RequestOptions) {
		return this.request<T>(endpoint, { ...options, method: 'GET' })
	},

	post<T>(endpoint: string, body?: any, options?: RequestOptions) {
		return this.request<T>(endpoint, { ...options, body, method: 'POST' })
	},

	put<T>(endpoint: string, body?: any, options?: RequestOptions) {
		return this.request<T>(endpoint, { ...options, body, method: 'PUT' })
	},

	patch<T>(endpoint: string, body?: any, options?: RequestOptions) {
		return this.request<T>(endpoint, { ...options, body, method: 'PATCH' })
	},

	delete<T>(endpoint: string, options?: RequestOptions) {
		return this.request<T>(endpoint, { ...options, method: 'DELETE' })
	},
}
