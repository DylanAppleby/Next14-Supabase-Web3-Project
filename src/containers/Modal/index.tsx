'use client'

import { FC, ReactElement, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import classNames from 'classnames'
import { Cross } from 'components/Icons'

interface IModal {
  title?: string
  showModal: boolean
  children: ReactElement | ReactElement[]
  transparent?: boolean
  onClose?: () => void
}

const ModalWrapper = ({
  title,
  children,
  showModal,
  transparent,
  onClose,
}: IModal): ReactElement =>
  showModal ? (
    <div className="dark:bg-navy/80 absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/40 backdrop-blur">
      {onClose ? (
        <div className="absolute z-0 h-full w-full" onClick={onClose} />
      ) : null}
      <div
        className={classNames(
          { 'bg-transparent': transparent, 'bg-white': !transparent },
          'dark:bg-gray-dark z-30 animate-float-zoom rounded-5 p-5'
        )}
      >
        {title && (
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-black/90">{title}</h2>
            {onClose && (
              <div
                className="flex transform cursor-pointer overflow-hidden rounded-full p-2 text-black/90 opacity-60 duration-300 hover:bg-black/5 hover:opacity-100"
                onClick={onClose}
              >
                <Cross />
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  ) : (
    <div />
  )

const Modal: FC<IModal> = ({
  title,
  children,
  showModal,
  onClose,
  transparent,
}) => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])
  if (isBrowser) {
    return createPortal(
      <ModalWrapper
        transparent={transparent}
        title={title}
        showModal={showModal}
        onClose={onClose}
      >
        {children}
      </ModalWrapper>,
      document.getElementById('modal-root') as Element
    )
  }

  return null
}

export default Modal
