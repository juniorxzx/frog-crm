'use client'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { motion } from 'framer-motion'
import S from './cpf.module.css'

interface InputCpfProps {
  placeholder?: string
  icon?: React.ReactNode
  type?: 'text' | 'password' | 'email' | 'number'
  value?: string
  onChange?: (value: string, formattedValue: string) => void
  disabled?: boolean
  className?: string
}

const InputCpf = ({
  icon,
  placeholder = '000.000.000-00',
  onChange,
  type,
  value = '',
  disabled,
  className,
}: InputCpfProps) => {
  const [focused, setFocused] = useState(false)

  const formatCPF = (value: string): string => {
    // Remove tudo que não é dígito
    const cleanValue = value.replace(/\D/g, '')

    // Aplica a máscara do CPF
    if (cleanValue.length <= 3) {
      return cleanValue
    } else if (cleanValue.length <= 6) {
      return `${cleanValue.slice(0, 3)}.${cleanValue.slice(3)}`
    } else if (cleanValue.length <= 9) {
      return `${cleanValue.slice(0, 3)}.${cleanValue.slice(3, 6)}.${cleanValue.slice(6)}`
    } else {
      return `${cleanValue.slice(0, 3)}.${cleanValue.slice(3, 6)}.${cleanValue.slice(6, 9)}-${cleanValue.slice(9, 11)}`
    }
  }

  const unformatCPF = (value: string): string => {
    return value.replace(/\D/g, '')
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const cleanValue = unformatCPF(inputValue)

    // Limita a 11 dígitos
    if (cleanValue.length <= 11) {
      const formattedValue = formatCPF(cleanValue)
      onChange?.(cleanValue, formattedValue)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`${S.container} ${focused ? S.focused : ''} ${className} ${disabled ? S.disabled : ''}`}
    >
      {icon && <span className={S.icon}>{icon}</span>}
      <input
        type={'text'}
        value={formatCPF(unformatCPF(value))}
        onChange={handleChange}
        placeholder={placeholder}
        className={S.input}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        maxLength={14}
      />
    </motion.div>
  )
}

export default InputCpf
