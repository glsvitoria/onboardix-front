'use client'

import { Input } from './input' // Seu input do Shadcn
import { Label } from './label' // Seu label do Shadcn
import { useState } from 'react'
import { Eye, EyeOff, LucideIcon } from 'lucide-react'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	icon: LucideIcon
	error?: string[] // Erros vindos da sua ActionState
	clearError: () => void // Função para limpar o erro no estado local
}

export function FormInput({
	label,
	icon: Icon,
	error,
	clearError,
	type,
	...props
}: FormInputProps) {
	const [showPassword, setShowPassword] = useState(false)

	const isPassword = type === 'password'
	const inputType = isPassword && showPassword ? 'text' : type

	return (
		<div className="space-y-1 w-full text-left">
			<Label className="text-xs font-medium uppercase text-muted-foreground">
				{label}
			</Label>

			<div className="relative">
				{/* Ícone fixo na esquerda */}
				<Icon className="absolute left-3 top-3 size-4 text-muted-foreground" />

				<Input
					{...props}
					type={inputType}
					onChange={(e) => {
						clearError() // Limpa o erro assim que o usuário digita
						props.onChange?.(e)
					}}
					className={`pl-10 rounded-xl transition-all ${
						error
							? 'border-destructive focus-visible:ring-destructive bg-destructive/5'
							: 'focus-visible:ring-primary'
					}`}
				/>

				{/* Botão de Toggle para Senhas */}
				{isPassword && (
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
					>
						{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
					</button>
				)}
			</div>

			{/* Renderização condicional do erro com animação */}
			{error && (
				<p className="text-[10px] text-destructive font-medium animate-in fade-in slide-in-from-top-1">
					{error[0]}
				</p>
			)}
		</div>
	)
}
