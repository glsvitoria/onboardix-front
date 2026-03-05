'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { assignTemplateAction } from '@/app/(panel)/dashboard/_actions/assign-template'
import { useActionToast } from '@/hooks/use-action-toast'
import { useRouter } from 'next/navigation'

export function AssignButton({
	employeeId,
	templateId,
}: {
	employeeId: string
	templateId: string
}) {
	const router = useRouter()

	const [state, formAction, isPending] = useActionState(
		assignTemplateAction,
		null,
	)

	useActionToast(state, () => {
		router.push(`/dashboard/colaboradores/${employeeId}`)
	})

	return (
		<form action={formAction}>
			<input type="hidden" name="userId" defaultValue={employeeId} />

			<input type="hidden" name="templateId" defaultValue={templateId} />

			<Button
				type="submit"
				isLoading={isPending}
				className="bg-white text-black font-bold hover:bg-zinc-200 rounded-xl gap-2"
			>
				Atribuir este
				<ArrowRight size={16} />
			</Button>
		</form>
	)
}
