'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { IoIosArrowForward } from 'react-icons/io'
import { LuLayoutDashboard } from 'react-icons/lu'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { usePathname } from 'next/navigation'

import S from './aside.module.css'

const Aside = () => {
  const path = usePathname()

  const menus = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <LuLayoutDashboard size={20} />,
      redirect: '/',
    },
    {
      id: 'relatorios',
      name: 'Relatórios',
      icon: <HiOutlineDocumentReport size={20} />,
      redirect: '/relatorios',
    },
  ]

  return (
    <aside className={S.aside}>
      <motion.div className={S.buttonContainer}>
        <IoIosArrowForward size={24} />
      </motion.div>
      <motion.div className={S.asideContent}>
        <motion.ul className={S.menu}>
          {menus.map(menu => (
            <li key={menu.id} className={S.menuItem}>
              <motion.div className={` ${S.menuLink} ${path === menu.redirect ? S.active : ''}`}>
                <motion.div className={S.menuIcon}>{menu.icon}</motion.div>
                <motion.div className={S.menuName}>{menu.name}</motion.div>
              </motion.div>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </aside>
  )
}

export default Aside
