import { ChangeEvent, memo, useCallback, useState } from 'react'

import classNames from 'classnames'
import { Magnifier } from 'components/Icons'
import debounce from 'lodash.debounce'

type ISearchBar = {
  placeholder?: string
  className?: string
  onSearch: (text: string) => void
}

const SearchBar = ({ placeholder, className, onSearch }: ISearchBar) => {
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false)
  const debouncedFn = debounce((text: string) => {
    onSearch(text)
  }, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedFn(event.target.value)
  }

  const handleFocus = useCallback(() => {
    setIsSearchFocused(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsSearchFocused(false)
  }, [])

  return (
    <label
      htmlFor="searchbar"
      title="Search bar"
      className={classNames(
        'relative flex h-12 items-center overflow-hidden rounded-7.5 border border-white/5 bg-black/5',
        {
          'w-10': !isSearchFocused,
          'w-52': isSearchFocused,
        },
        className
      )}
    >
      <input
        id="searchbar"
        title="Search bar"
        type="text"
        onChange={handleChange}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={classNames(
          'w-full bg-transparent py-4 pr-4 text-base font-medium leading-4 outline-none transition-all duration-300 placeholder:text-sm',
          {
            'pl-11': !isSearchFocused,
            'pl-4': isSearchFocused,
          }
        )}
      />
      <div
        className={classNames(
          'absolute text-black/40 transition-all duration-300',
          {
            'left-2.5 opacity-100': !isSearchFocused,
            'left-0 opacity-0': isSearchFocused,
          }
        )}
      >
        <Magnifier className="h-4 w-4" />
      </div>
    </label>
  )
}

export default memo(SearchBar)
