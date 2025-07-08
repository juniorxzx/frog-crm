'use client'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { motion } from 'framer-motion'
import S from './input.module.css'

interface InputProps {
  placeholder?: string
  icon?: React.ReactNode
  type?: 'text' | 'password' | 'email' | 'number'
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  className?: string
  maxLength?: number
}

const Input = ({
  icon,
  placeholder,
  onChange,
  type,
  value,
  disabled,
  className,
  maxLength,
}: InputProps) => {
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`${S.container} ${focused ? S.focused : ''} ${className} ${disabled ? S.disabled : ''}`}
    >
      {icon && <span className={S.icon}>{icon}</span>}
      <input
        type={type === 'password' && showPassword ? 'text' : type || 'text'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={S.input}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        maxLength={maxLength}
      />
      {type === 'password' && (
        <div className={S.showBox} onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
        </div>
      )}
    </motion.div>
  )
}

export default Input
