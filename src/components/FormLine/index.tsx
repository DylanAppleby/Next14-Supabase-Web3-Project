import {
  ChangeEvent,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
} from 'react'

import classNames from 'classnames'
import { RightArrow, Spinner } from 'components/Icons'

interface IFormLine extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  type?: string
  title?: string
  showStatus?: boolean
  isLoading?: boolean
  placeholder?: string
  value?: string
  error?: string | boolean
  required?: boolean
  disabled?: boolean
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  onStatusClick?: (e: MouseEvent<HTMLDivElement>) => void
}

const FormLine: ForwardRefRenderFunction<HTMLInputElement, IFormLine> = (
  {
    id,
    type,
    title,
    showStatus,
    isLoading,
    placeholder,
    value,
    error,
    required,
    disabled,
    className,
    onChange,
    onKeyDown,
    onStatusClick,
    ...restProps
  },
  ref
) => {
  return (
    <div
      className={classNames(
        'relative flex flex-col gap-1 duration-0 ease-in-out',
        className
      )}
    >
      <label
        title={title}
        htmlFor={id}
        className={classNames(
          'flex flex-col gap-1 text-sm font-semibold leading-4 duration-300 ease-in-out',
          {
            'text-red': error,
            'text-black/60': !error,
          }
        )}
      >
        {title}
        {required && '*'}

        <input
          {...restProps}
          id={id}
          className="rounded-xl bg-black/5 p-3 text-base font-medium leading-5 text-black/90 placeholder-black/40 outline-none autofill:bg-black/5"
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          disabled={disabled}
          onChange={onChange}
          onKeyDown={onKeyDown}
          aria-label={title}
        />
      </label>
      {showStatus && (
        <div
          className={classNames(
            'bg-gray-medium absolute bottom-3 right-3 flex cursor-pointer items-center justify-center rounded-full p-1 text-white [&>svg]:h-3.5 [&>svg]:w-3.5',
            {
              'animate-spin': isLoading,
            }
          )}
          onClick={onStatusClick}
        >
          {isLoading ? <Spinner /> : <RightArrow />}
        </div>
      )}
      <div
        className={classNames(
          'whitespace-pre text-sm font-semibold leading-4 text-red duration-300 ease-in-out',
          { 'text-red/0': !error }
        )}
      >
        {error || ''}
      </div>
    </div>
  )
}

export default forwardRef(FormLine)
