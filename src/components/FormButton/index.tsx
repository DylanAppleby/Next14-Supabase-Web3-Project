/* eslint-disable react/button-has-type */
import classNames from 'classnames'
import { RightArrow, Spinner } from 'components/Icons'

const FormButton = ({
  isLoading,
  onClick,
  disabled,
  type,
}: {
  disabled?: boolean
  isLoading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}) => (
  <button
    type={type || 'button'}
    disabled={disabled || isLoading}
    className={classNames(
      'z-10 flex h-18 w-18 cursor-pointer items-center justify-center rounded-full text-black [&>svg]:h-6 [&>svg]:w-6',
      {
        'animate-spin': isLoading,
      },
      {
        ' bg-lightGolden': !disabled,
        'bg-black/10': disabled,
      }
    )}
    onClick={onClick}
  >
    {isLoading ? (
      <Spinner />
    ) : (
      <RightArrow className={classNames({ 'text-black/20': disabled })} />
    )}
  </button>
)

export default FormButton
