// src/app/dashboard/templates/_components/pagination.tsx
'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationProps {
	currentPage: number
	lastPage: number
	total: number
}

export function Pagination({ currentPage, lastPage, total }: PaginationProps) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('page', newPage.toString())
		router.push(`?${params.toString()}`)
	}

	if (total === 0) return null

	return (
		<div className="flex items-center justify-between border-t border-white/5 pt-6">
			<div className="text-sm text-zinc-500">
				Mostrando página{' '}
				<span className="text-zinc-200 font-medium">{currentPage}</span> de{' '}
				<span className="text-zinc-200 font-medium">{lastPage}</span>
				<span className="ml-2 text-zinc-700">({total} registros no total)</span>
			</div>

			<div className="flex gap-2">
				<Button
					variant="outline"
					size="sm"
					disabled={currentPage <= 1}
					onClick={() => handlePageChange(currentPage - 1)}
					className="rounded-xl border-white/10 hover:bg-white/5 text-zinc-300"
				>
					<ChevronLeft size={18} className="mr-1" /> Anterior
				</Button>

				<Button
					variant="outline"
					size="sm"
					disabled={currentPage >= lastPage}
					onClick={() => handlePageChange(currentPage + 1)}
					className="rounded-xl border-white/10 hover:bg-white/5 text-zinc-300"
				>
					Próximo <ChevronRight size={18} className="ml-1" />
				</Button>
			</div>
		</div>
	)
}
