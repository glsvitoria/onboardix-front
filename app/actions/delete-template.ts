'use server'

import { ACCESS_TOKEN } from '@/common/token'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function deleteTemplateAction(id: string) {
	try {
		const token = (await cookies()).get(ACCESS_TOKEN)?.value
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/templates/${id}`,
			{
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			}
		)

		if (response.ok) {
			revalidatePath('/dashboard/templates')
			return { success: true }
		}
	} catch (e) {
		console.error('[DeleteTemplateAction Error]', e)
		return { success: false }
	}
}
