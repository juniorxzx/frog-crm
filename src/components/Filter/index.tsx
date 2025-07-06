import React from 'react'

import S from './filter.module.css'
import Input from '../Input'

interface FilterProps {}

const Filter = () => {
  return (
    <div className={S.filter}>
      <Input />
    </div>
  )
}

export default Filter
