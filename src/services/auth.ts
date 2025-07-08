import { api } from '@/lib/axios'
import { parseCookies } from 'nookies'

export type SignInData = {
  email: string
  password: string
}

export const Auth = {
  async signIn(data: SignInData) {
    const response = await api.post('/auth/login', data)

    return response.data
  },

  async signOut() {
    const response = await api.post('/auth/logout')

    return response.data
  },

  async profile() {
    const localToken = sessionStorage.getItem('token')
    const cookieToken = parseCookies().token

    const token = localToken || cookieToken

    const response = await api.post('/auth/decode-token', { token })

    return response.data
  },

  async searchByEmail(email: string) {
    const response = await api.post('/auth/search', { email })
    return response.data
  },

  async resetPassword(email: string, cpf: string, password: string) {
    const response = await api.post('/auth/reset-password', { email, cpf, password })

    return response.data
  },
}
