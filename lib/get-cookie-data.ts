import { CookieToken } from '@/types/token'

export const getCookieData = (raw: string | undefined): CookieToken | null => {
	try {
		return raw ? JSON.parse(raw) : null
	} catch {
		return null
	}
}
