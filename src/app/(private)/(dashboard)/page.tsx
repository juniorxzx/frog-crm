import React from 'react'
import S from './page.module.css'
import Filter from '@/components/Filter'

export default function Home() {
  return (
    <main className={S.main}>
      <h1>Private</h1>
      <Filter />
      <p>Welcome to the private area of the application.</p>
    </main>
  )
}
