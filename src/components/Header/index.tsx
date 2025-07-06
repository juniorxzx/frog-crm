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
  })
  const path = usePathname()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await Auth.profile()
        if (data) {
          setUser({
            name: data.name || '',
            email: data.email || '',
            role: data.role || '',
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
        <UserDetails avatar="" email={user.email} name={user.email} />
      </motion.div>
    </header>
  )
}

export default Header
