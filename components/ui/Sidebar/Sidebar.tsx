import Portal from '@reach/portal'
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock'
import cn from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import s from './Sidebar.module.css'

interface Props {
  children: any
  open: boolean
  onClose: () => void
}

const Sidebar: FC<Props> = ({ children, open = false, onClose }) => {
  const [ready, setReady] = useState(open)
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>
  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [open])
  useEffect(() => {
    if (!ready && open) {
      setReady(true)
    }
  }, [open])
  if (!ready) {
    return null
  }
  return (
    <Portal>
      {open ? (
        <div className={s.root} ref={ref}>
          <div className={'absolute inset-0 overflow-hidden'}>
            <div
              className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={onClose}
            />
            <section
              className={cn(
                s.sidebar,
                'absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 outline-none'
              )}
            >
              <div className="h-full md:w-screen md:max-w-md">
                <div className="h-full flex flex-col text-base bg-1 shadow-xl overflow-y-auto">
                  {children}
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className={cn(s.root, 'pointer-events-none')} ref={ref}>
          <div
            className={'absolute inset-0 overflow-hidden pointer-events-none'}
          >
            <div />
            <section
              className={cn(
                s.sidebarClose,
                'absolute inset-y-0 right-0 pl-10 opacity-0 max-w-full flex sm:pl-16 outline-none'
              )}
            >
              <div className="h-full md:w-screen md:max-w-md">
                <div className="h-full flex flex-col text-base bg-1 shadow-xl overflow-y-auto">
                  {children}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </Portal>
  )
}

export default Sidebar
