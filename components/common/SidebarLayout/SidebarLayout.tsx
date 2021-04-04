import { UserNav } from '@components/common'
import { Cross } from '@components/icons'
import { useUI } from '@components/ui/context'
import cn from 'classnames'
import { FC } from 'react'
import s from './SidebarLayout.module.css'
interface Props {
  className?: string
}
const SidebarLayout: FC<Props> = ({ children, className }) => {
  const { closeSidebar } = useUI()
  const handleClose = () => closeSidebar()
  return (
    <div className={cn(s.root, className)}>
      <header className="px-4 pt-6 pb-4 sm:px-6">
        <div className="flex justify-between space-x-3 items-center">
          <div className="h-7 flex items-center">
            <button
              onClick={handleClose}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150"
            >
              <Cross className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-1">
            <UserNav />
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}

export default SidebarLayout
