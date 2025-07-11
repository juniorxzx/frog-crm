'use client'

import React, { useState } from 'react'
import Input from '@/components/Input'
import { MdOutlineEmail, MdLockOutline } from 'react-icons/md'
import Checkbox from '@/components/Checkbox'
import Link from 'next/link'
import Button from '@/components/Button'
import { motion } from 'framer-motion'

import S from './sign-in.module.css'
import { Auth } from '@/services/auth'
import { parseCookies, setCookie } from 'nookies'
import Popup from '@/components/Popup'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const data = await Auth.signIn({
        email,
        password,
      })
      const token = data.access_token
      if (rememberMe) {
        setCookie(null, 'token', token, {
          maxAge: 60 * 60 * 24 * 4,
        })
      } else {
        sessionStorage.setItem('token', token)
      }
    } catch (error: any) {
      setLoading(false)
      setError(true)
      console.error('Erro ao fazer login:', error.response.data.message)
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
            <h1 className={S.formTitle}>Entrar</h1>
            <p className={S.formSubtitle}>Faça login para continuar</p>
          </motion.div>

          <div className={S.formBody}>
            <Input
              type="email"
              onChange={handleEmailChange}
              value={email}
              placeholder="Digite seu email"
              icon={<MdOutlineEmail size={20} />}
              disabled={loading}
            />
            <div className={S.passwordContainer}>
              <Input
                type={showPassword ? 'text' : 'password'}
                onChange={handlePasswordChange}
                value={password}
                placeholder="Digite sua senha"
                icon={<MdLockOutline size={20} />}
                disabled={loading}
              />
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={S.formActions}
              >
                <Checkbox checked={rememberMe} label="Salvar login" onChange={setRememberMe} />
                <Link href={'/reset-password'} className={S.forgotPassword}>
                  Esqueci a senha
                </Link>
              </motion.div>
            </div>
            <Button label="Entrar" onClick={handleSubmit} disabled={loading} />
          </div>
        </div>
      </div>
      {error && <Popup message="Email ou senha incorretos" type="error" />}
    </main>
  )
}
