import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, Transition } from 'framer-motion'
import { MdCheckCircleOutline, MdHelpOutline, MdOutlineErrorOutline } from 'react-icons/md'

import S from './popup.module.css'

interface PopupProps {
  type?: 'success' | 'error' | 'info'
  message: string
  onClose?: () => void
  duration?: number
}

const Popup = ({ type = 'info', message, onClose, duration = 4000 }: PopupProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 600)

    const closeTimer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        onClose?.()
      }, 400)
    }, duration)

    return () => {
      clearTimeout(contentTimer)
      clearTimeout(closeTimer)
    }
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose?.()
    }, 400)
  }

  const popupVariants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      y: -20,
      width: 60,
      height: 40,
      borderRadius: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      width: 'auto',
      height: 'auto',
      borderRadius: 16,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      } as Transition,
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -10,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 1, 1],
      } as Transition,
    },
  }

  const contentVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.3,
        ease: 'easeOut',
      } as Transition,
    },
  }

  return (
    <div className={S.container}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            className={`${S.popup} ${S[type]}`}
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
            layout
          >
            <AnimatePresence>
              {showContent && (
                <motion.div
                  className={S.content}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className={S.icon}>
                    {type === 'success' && (
                      <span className={S.errorIcon}>
                        <MdCheckCircleOutline size={20} />
                      </span>
                    )}
                    {type === 'error' && (
                      <span className={S.errorIcon}>
                        <MdOutlineErrorOutline size={20} />
                      </span>
                    )}
                    {type === 'info' && (
                      <span className={S.errorIcon}>
                        <MdHelpOutline size={20} />
                      </span>
                    )}
                  </div>
                  <div className={S.message}>{message}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Popup
