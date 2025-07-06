'use client'

import React from 'react'

import S from './layout.module.css'
import Aside from '../Aside'
import Header from '../Header'

interface LayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={S.layout}>
      <Aside />
      <div className={S.mainContent}>
        <Header />
        {children}
      </div>
    </div>
  )
}

export default Layout
