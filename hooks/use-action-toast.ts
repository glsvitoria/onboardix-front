import { ActionState } from '@/types/action-state'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import z from 'zod'

export function useActionToast<T extends z.ZodType<any, any, any>>(
	state: ActionState<T> | null,
	onSuccess?: () => void,
) {
	const lastTimestamp = useRef<number | undefined>(undefined)

	useEffect(() => {
		if (!state?.timestamp || state.timestamp === lastTimestamp.current) return

		lastTimestamp.current = state.timestamp

		if (state.errors?.global) {
			toast.error(state.errors.global)
		} else if (state.success || !state.errors) {
			toast.success(state.message)

      onSuccess?.()
		}
	}, [state])
}
