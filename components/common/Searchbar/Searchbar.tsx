import { FC, useEffect, useMemo } from 'react'
import cn from 'classnames'
import s from './Searchbar.module.css'
import { useRouter } from 'next/router'
import { Search } from '@components/icons'

interface Props {
  className?: string
  id?: string
}

const Searchbar: FC<Props> = ({ className, id = 'search' }) => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/search')
  }, [])

  return useMemo(
    () => (
      <div
        className={cn(
          ' text-sm bg-transparent focus-within:text-primary text-base w-full transition-colors duration-150 max-w-xs',
          className
        )}
      >
        <div className={s.wrap}>
          <label className="hidden" htmlFor={id}>
            Search
          </label>
          <input
            id={id}
            className={s.input}
            placeholder="Search for products..."
            defaultValue={router.query.q}
            onKeyUp={(e) => {
              e.preventDefault()

              if (e.key === 'Enter') {
                const q = e.currentTarget.value

                router.push(
                  {
                    pathname: `/search`,
                    query: q ? { q } : {},
                  },
                  undefined,
                  { shallow: true }
                )
              }
            }}
          />
          <div className={s.iconContainer}>
            <Search />
          </div>
        </div>
      </div>
    ),
    []
  )
}

export default Searchbar
