import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { MdOutlineExitToApp, MdSettings } from 'react-icons/md'
import { hoverItem } from '@/assets/framer-animations/hover-item'
import { destroyCookie } from 'nookies'

import S from './userDetails.module.css'
import { useRouter } from 'next/navigation'

interface User {
  name?: string
  email?: string
  avatar?: string
}
const UserDetails = ({ avatar, email, name }: User) => {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const router = useRouter()

  const handleItem = (id: number) => {
    setOpen(false)
    if (id === 1) {
      router.push('/profile')
    }
    if (id === 2) {
      router.push('/settings')
    }

    if (id === 3) {
      destroyCookie(null, 'token')
      router.push('/sign-in')
    }
  }

  const items = [
    { id: 1, title: 'Perfil', icon: <FaUserCircle size={20} /> },
    { id: 2, title: 'Ajustes', icon: <MdSettings size={20} /> },
    {
      id: 3,
      title: 'Sair',
      icon: <MdOutlineExitToApp size={20} />,
    },
  ]

  return (
    <motion.div className={S.userContainer} onClick={() => setOpen(!open)}>
      <motion.div className={S.userAvatar}>
        {avatar ? (
          <img src={`http://localhost:8080${avatar}`} alt={name} className={S.avatarImage} />
        ) : (
          <FaUserCircle size={30} className={S.defaultAvatar} />
        )}
      </motion.div>
      <motion.div className={S.userDetails}>
        <span className={S.email}>{email}</span>
        <h3 className={S.username}>{name}</h3>
      </motion.div>
      <motion.div className={S.userIconDown}>
        <IoIosArrowDown size={16} />
      </motion.div>

      {open && (
        <motion.div className={S.userList}>
          {items.map(item => (
            <motion.div
              key={item.id}
              className={S.userItem}
              onClick={() => handleItem(item.id)}
              {...hoverItem}
            >
              <div className={S.icon}>{item.icon}</div>
              <span className={S.text}>{item.title}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default UserDetails
