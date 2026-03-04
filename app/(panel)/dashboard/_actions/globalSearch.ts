'use server'

import { searchDashboardService } from '@/services/dashboard/search'

export async function globalSearchAction(query: string) {
	if (!query || query.length < 2) return []

	try {
		const { results } = await searchDashboardService({
			params: {
				q: query,
			},
		})

		return results
	} catch (error) {
		console.error('Search Action Error:', error)
		return []
	}
}
