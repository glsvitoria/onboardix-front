'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

interface PaginationProps {
	currentPage: number
  property?: string
	itemsPerPage: number
	totalItems: number
}

export function Pagination({
	currentPage,
  property,
	totalItems,
	itemsPerPage,
}: PaginationProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const totalPages = Math.ceil(totalItems / itemsPerPage)

	if (totalPages <= 1) return null

	const createPageUrl = (pageNumber: number) => {
		const params = new URLSearchParams(searchParams)
		params.set(property ? property :'page', pageNumber.toString())
		return `${pathname}?${params.toString()}`
	}

	const handlePageChange = (page: number) => {
		router.push(createPageUrl(page))
	}

	return (
		<div className="flex items-center justify-between px-2 py-4 border-t border-white/5 mt-4">
			<div className="text-sm text-zinc-500">
				Mostrando{' '}
				<span className="font-medium text-zinc-300">
					{(currentPage - 1) * itemsPerPage + 1}
				</span>{' '}
				a{' '}
				<span className="font-medium text-zinc-300">
					{Math.min(currentPage * itemsPerPage, totalItems)}
				</span>{' '}
				de <span className="font-medium text-zinc-300">{totalItems}</span>{' '}
				resultados
			</div>

			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					disabled={currentPage <= 1}
					onClick={() => handlePageChange(currentPage - 1)}
					className="bg-zinc-900/50 border-white/5 hover:bg-zinc-800 text-zinc-400"
				>
					<ChevronLeft size={16} className="mr-1" /> Anterior
				</Button>

				<div className="flex items-center gap-1 px-2">
					<span className="text-sm font-medium text-zinc-200">
						{currentPage}
					</span>
					<span className="text-sm text-zinc-500">/</span>
					<span className="text-sm text-zinc-500">{totalPages}</span>
				</div>

				<Button
					variant="outline"
					size="sm"
					disabled={currentPage >= totalPages}
					onClick={() => handlePageChange(currentPage + 1)}
					className="bg-zinc-900/50 border-white/5 hover:bg-zinc-800 text-zinc-400"
				>
					Próximo <ChevronRight size={16} className="ml-1" />
				</Button>
			</div>
		</div>
	)
}
