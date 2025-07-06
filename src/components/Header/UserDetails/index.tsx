import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'

import S from './userDetails.module.css'

interface User {
  name?: string
  email?: string
  avatar?: string
}
const UserDetails = ({ avatar, email, name }: User) => {
  const [open, setOpen] = useState(false)
  const user = {
    name: 'Alexandre',
    email: 'alexandre@frog.net.br',
    avatar: '',
  }

  const items = [
    { id: 1, title: 'Perfil', icon: <FaUserCircle size={20} /> },
    { id: 2, title: 'Ajustes', icon: <FaUserCircle size={20} /> },
    { id: 3, title: 'Sair', icon: <FaUserCircle size={20} /> },
  ]

  return (
    <motion.div className={S.userContainer} onClick={() => setOpen(!open)}>
      <motion.div className={S.userAvatar}>
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className={S.avatarImage} />
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
              onClick={() => {
                console.log(`Selected item: ${item.title}`)
                setOpen(false)
              }}
            >
              {item.title}
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default UserDetails
