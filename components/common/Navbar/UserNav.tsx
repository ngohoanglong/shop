import { Bag, Heart, Search } from '@components/icons'
import { useUI } from '@components/ui/context'
import useCart from '@framework/cart/use-cart'
import useCustomer from '@framework/customer/use-customer'
import type { LineItem } from '@framework/types'
import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import DropdownMenu from './DropdownMenu'
import s from './UserNav.module.css'

interface Props {
  className?: string
}

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: FC<Props> = ({ className }) => {
  const { data } = useCart()
  const { data: customer } = useCustomer()
  const {
    openSidebar,
    toggleSidebar,
    closeSidebarIfPresent,
    setModalView,
    openModal,
  } = useUI()
  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <li className={cn(s.item, s.visibleOnLg)}>
            {customer ? (
              <DropdownMenu />
            ) : (
              <a
                onClick={() => {
                  setModalView('LOGIN_VIEW')
                  openModal()
                }}
                className="text-sm"
                aria-label="Wishlist"
              >
                Sign in
              </a>
            )}
          </li>
          <li className={cn(s.item, s.visibleOnLg)} onClick={toggleSidebar}>
            <Search />
          </li>
          {process.env.COMMERCE_WISHLIST_ENABLED && (
            <li className={cn(s.item, s.visibleOnLg, 'hidden lg:block')}>
              <Link href="/wishlist">
                <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                  <Heart />
                </a>
              </Link>
            </li>
          )}
          <li
            className={s.item}
            onClick={() => {
              setModalView('CART')
              openSidebar()
            }}
          >
            <Bag />
            {itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default UserNav
