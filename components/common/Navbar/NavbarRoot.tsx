import cn from 'classnames'
import throttle from 'lodash.throttle'
import { FC, useEffect, useState } from 'react'
import s from './Navbar.module.css'
export interface Props {
  transparent?: boolean
}
const NavbarRoot: FC<Props> = ({ children, transparent }) => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset
      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled)
      }
    }, 200)
    document.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])

  return (
    <div
      className={cn(
        s.root,
        transparent && s.transparent,
        hasScrolled && s.hasScrolled
      )}
    >
      {children}
    </div>
  )
}

export default NavbarRoot
