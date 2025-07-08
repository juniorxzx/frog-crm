'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import S from './reset-password.module.css'
import Input from '@/components/Input'
import { Auth } from '@/services/auth'
import { MdLockOutline, MdOutlineEmail, MdOutlineTagFaces } from 'react-icons/md'
import Button from '@/components/Button'
import InputCpf from '@/components/Input/cpf'
import Popup from '@/components/Popup'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpf, setCpf] = useState('')
  const [cpfFormatted, setCpfFormatted] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isValidCPF, setIsValidCPF] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleCpfChange = (cleanValue: string, formattedValue: string) => {
    setCpf(cleanValue)
    setCpfFormatted(formattedValue)

    if (cleanValue.length === 11) {
      setIsValidCPF(true)
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSearchEmail = async () => {
    if (!email) {
      setError(true)
      return
    }

    setLoading(true)
    setError(false)

    try {
      const response = await Auth.searchByEmail(email)
      if (response) {
        setIsValidEmail(true)
      } else {
        setIsValidEmail(false)
        setError(true)
      }
    } catch (err) {
      console.error('Erro ao buscar email:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!email || !password || !cpf) {
      setError(true)
      return
    }

    setLoading(true)
    setError(false)

    try {
      const response = await Auth.resetPassword(email, cpfFormatted, password)
      if (response) {
        alert('Senha alterada com sucesso!')
        setEmail('')
        setPassword('')
        setCpf('')
        setCpfFormatted('')
        setIsValidEmail(false)
        setIsValidCPF(false)
      } else {
        setError(true)
      }
    } catch (err) {
      console.error('Erro ao alterar senha:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className={S.main}>
      <div className={S.container}>
        <div className={S.form}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={S.formHeader}
          >
            <h1 className={S.formTitle}>Recuperar senha</h1>
            <p className={S.formSubtitle}>
              Digite seu email e siga os passos para recuperar sua conta.
            </p>
          </motion.div>

          <div className={S.formBody}>
            <Input
              type="email"
              onChange={handleEmailChange}
              value={email}
              placeholder="Digite seu email"
              icon={<MdOutlineEmail size={20} />}
              disabled={loading || isValidEmail}
            />

            {isValidEmail && (
              <div className={S.passwordContainer}>
                <p className={S.formSubtitle}>
                  Agora é só digitar o CPF associado ao email e uma nova senha.
                </p>
                <InputCpf
                  type={'text'}
                  onChange={handleCpfChange}
                  value={cpf}
                  placeholder="Digite o CPF associado ao email"
                  icon={<MdOutlineTagFaces size={20} />}
                  disabled={loading}
                />
                {isValidCPF && (
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    onChange={handlePasswordChange}
                    value={password}
                    placeholder="Digite sua senha"
                    icon={<MdLockOutline size={20} />}
                    disabled={loading}
                  />
                )}
              </div>
            )}
            <Button
              label={isValidEmail ? 'Alterar senha' : 'Buscar'}
              onClick={isValidEmail ? handleSubmit : handleSearchEmail}
              disabled={loading}
            />
          </div>
        </div>
      </div>
      {error && <Popup message="CPF não está vinculado a essa conta" type="error" />}
    </main>
  )
}

export default ResetPassword
