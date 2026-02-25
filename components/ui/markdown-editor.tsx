'use client'

import { useState } from 'react'
import { Textarea } from './textarea'
import ReactMarkdown from 'react-markdown'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from './button'

interface MarkdownEditorProps {
	value: string
	onChange: (value: string) => void
	placeholder?: string
	error?: string[]
}

export function MarkdownEditor({
	value,
	onChange,
	placeholder,
	error,
}: MarkdownEditorProps) {
	const [showPreview, setShowPreview] = useState(false)

	return (
		<>
			<div
				className={`grid gap-px overflow-hidden rounded-xl border border-white/5 bg-white/5 transition-all duration-300 ${
					showPreview ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
				}`}
			>
				{/* Coluna de Escrita */}
				<div className="bg-[#09090b] p-2">
					<div className="flex items-center justify-between px-3 py-1 mb-2 border-b border-white/5">
						<span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
							Editor
						</span>

						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => setShowPreview(!showPreview)}
							className="h-6 px-2 text-[10px] uppercase font-bold text-zinc-400 hover:text-primary transition-colors gap-1.5"
						>
							{showPreview ? (
								<>
									{' '}
									<EyeOff size={12} /> Esconder Preview{' '}
								</>
							) : (
								<>
									{' '}
									<Eye size={12} /> Ver Preview{' '}
								</>
							)}
						</Button>
					</div>

					<Textarea
						placeholder={placeholder}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						className="min-h-[200px] border-none bg-transparent focus-visible:ring-0 resize-none scrollbar-hide text-sm"
					/>
				</div>

				{/* Coluna de Visualização (Condicional) */}
				{showPreview && (
					<div className="bg-zinc-900/20 p-2 animate-in fade-in slide-in-from-right-2 duration-300">
						<div className="flex items-center gap-2 px-3 py-1 mb-2 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
							Preview
						</div>
						<div className="min-h-[200px] p-3 prose prose-invert max-w-none break-words">
							{value ? (
								<ReactMarkdown>{value}</ReactMarkdown>
							) : (
								<span className="text-zinc-600 italic">
									O resultado aparecerá aqui...
								</span>
							)}
						</div>
					</div>
				)}
			</div>

			{error && (
				<p className="text-[10px] text-destructive font-medium">{error[0]}</p>
			)}
		</>
	)
}
