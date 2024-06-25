import { FC, ReactNode } from 'react'

import classNames from 'classnames'
import { Spinner } from 'components/Icons'

type IButton = {
  className?: string
  disabled?: boolean
  children?: ReactNode
  name?: string
  isLoading?: boolean
  type?: 'submit'
  onClick?: () => void
}

const Button: FC<IButton> = ({
  className,
  disabled,
  children,
  isLoading,
  name,
  type,
  onClick,
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      name={name}
      title={name}
      onClick={onClick}
      type={type ? 'submit' : 'button'}
      className={classNames(
        'flex justify-center rounded-md px-3 py-2 text-sm font-semibold transition-opacity ease-in hover:opacity-70 disabled:cursor-not-allowed disabled:bg-black/20 disabled:text-black/90 disabled:hover:opacity-100',
        className
      )}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

export default Button
