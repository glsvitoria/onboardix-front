'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { assignTemplateAction } from '@/app/actions/assign-template'

export function AssignButton({
	employeeId,
	templateId,
}: {
	employeeId: string
	templateId: string
}) {
	// O bind aqui prepara os argumentos fixos da função
	const actionWithIds = assignTemplateAction.bind(null, employeeId, templateId)

	const [state, formAction, isPending] = useActionState(actionWithIds, null)

	useEffect(() => {
		if (state?.error) {
			toast.error(state.error)
		}
	}, [state])

	return (
		<form action={formAction}>
			<Button
				type="submit"
				disabled={isPending}
				className="bg-white text-black font-bold hover:bg-zinc-200 rounded-xl gap-2"
			>
				{isPending ? (
					<Loader2 className="animate-spin" size={16} />
				) : (
					<>
						Atribuir este
						<ArrowRight size={16} />
					</>
				)}
			</Button>
		</form>
	)
}
