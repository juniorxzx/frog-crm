import React from 'react'
import { motion } from 'framer-motion'

import S from './checkbox.module.css'

interface CheckboxProps {
  onChange: (checked: boolean) => void
  checked?: boolean
  label?: string
  disabled?: boolean
  className?: string
}

const Checkbox = ({ checked, className, disabled, label, onChange }: CheckboxProps) => {
  const handleCheck = () => {
    if (disabled) return
    onChange(!checked)
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileTap={{ scale: 0.95 }}
      className={`${S.container} ${className || ''}`}
      onClick={() => !disabled && onChange?.(!checked)}
    >
      <div className={S.box}>{checked && <div className={S.check}></div>}</div>
      <span className={S.label}>{label}</span>
    </motion.div>
  )
}

export default Checkbox
