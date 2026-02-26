'use server'

import { fetchAdapter as api } from '@/lib/api/fetch-adapter'

interface SearchResult {
	id: string
	name: string
	type: 'USER' | 'TRACK'
}

export async function globalSearchAction(query: string) {
	if (!query || query.length < 2) return []

	try {
		const results = await api.get('/dashboard/search', {
			params: {
				q: query,
			},
		})

		return results as SearchResult[]
	} catch (error) {
		console.error('Search Action Error:', error)
		return []
	}
}
