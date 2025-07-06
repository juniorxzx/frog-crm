import React from 'react'
import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { CgWorkAlt } from 'react-icons/cg'
import { motion } from 'framer-motion'

import S from './jobDetails.module.css'

const JobDetails = () => {
  const [openJob, setOpenJob] = useState(false)
  const jobs = [
    { id: 1, title: 'Sky' },
    { id: 2, title: 'ATN' },
    { id: 3, title: 'Avenida' },
  ]
  return (
    <motion.div className={S.jobContainer} onClick={() => setOpenJob(!openJob)}>
      <motion.div className={S.job}>
        <motion.div className={S.jobIcon}>
          <CgWorkAlt size={20} />
        </motion.div>
        <motion.div className={S.jobTitle}>{jobs[0]?.title}</motion.div>
      </motion.div>
      <motion.div className={S.jobIconDown}>
        <IoIosArrowDown size={16} />
      </motion.div>

      {openJob && (
        <motion.div className={S.jobList}>
          {jobs.map(job => (
            <motion.div
              key={job.id}
              className={S.jobItem}
              onClick={() => {
                console.log(`Selected job: ${job.title}`)
                setOpenJob(false)
              }}
            >
              {job.title}
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default JobDetails
