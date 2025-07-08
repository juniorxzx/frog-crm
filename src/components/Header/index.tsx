'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

import S from './header.module.css'
import JobDetails from './JobDetails'
import UserDetails from './UserDetails'
import { Auth } from '@/services/auth'

const Header = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    avatarUrl: '',
  })
  const path = usePathname()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await Auth.profile()
        if (data) {
          setUser({
            name: data.username || '',
            email: data.email || '',
            role: data.role || '',
            avatarUrl: data.avatar || '',
          })
          console.log('Profile data:', data)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }
    getProfile()
  }, [])

  return (
    <header className={S.header}>
      <motion.div className={S.leftContainer}>
        <motion.div className={S.title}>
          <h1>{path === '/' ? 'Dashboard' : path.replace('/', '')}</h1>
        </motion.div>
      </motion.div>
      <motion.div className={S.rightContainer}>
        <JobDetails />
        <UserDetails avatar={user.avatarUrl} email={user.email} name={user.name} />
      </motion.div>
    </header>
  )
}

export default Header
