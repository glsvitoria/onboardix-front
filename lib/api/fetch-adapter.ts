import { cookies } from 'next/headers'
import { ACCESS_TOKEN } from '@/common/token'
import { IApiAdapter, RequestOptions } from './types'
import { getCookieData } from '../get-cookie-data'
import { headers as nextHeaders } from 'next/headers'
import { redirect } from 'next/navigation'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchAdapter: IApiAdapter = {
	async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
		const { params, body, headers, ...rest } = options

		const url = new URL(`${BASE_URL}${endpoint}`)

		if (params) {
			Object.entries(params).forEach(([key, val]) =>
				url.searchParams.append(key, String(val)),
			)
		}

		const accessToken = getCookieData(
			(await cookies()).get(ACCESS_TOKEN)?.value,
		)

		const config: RequestInit = {
			...rest,
			headers: {
				'Content-Type': 'application/json',
				...(accessToken && { Authorization: `Bearer ${accessToken?.value}` }),
				...headers,
			},
			body: body ? JSON.stringify(body) : undefined,
		}

		const response = await fetch(url.toString(), config)

    const isAuthRoute = endpoint.includes('/auth/login') || endpoint === '/auth/refresh'

		if (response.status === 401 && !isAuthRoute) {
			const headersList = await nextHeaders()

			const referer = headersList.get('referer')

			let callbackPart = ''
			if (referer) {
				try {
					const urlObj = new URL(referer)
					callbackPart = `?callbackUrl=${encodeURIComponent(urlObj.pathname + urlObj.search)}`
				} catch (e) {
					callbackPart = ''
				}
			}

			redirect(`/api/auth/refresh${callbackPart}`)
		}

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}))

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
