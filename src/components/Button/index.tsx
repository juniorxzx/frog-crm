import React from 'react'
import { motion } from 'framer-motion'

import S from './button.module.css'

interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
  className?: string
}

const Button = ({ disabled, label, onClick, className }: ButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileTap={{ scale: 0.95 }}
      className={`${S.button} ${disabled ? S.disabled : ''} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </motion.button>
  )
}

export default Button
