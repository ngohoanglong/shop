import { FC } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import type { LineItem } from '@framework/types'
import useCart from '@framework/cart/use-cart'
import useCustomer from '@framework/customer/use-customer'
import { Avatar } from '@components/common'
import { Heart, Bag, User, Menu, Search } from '@components/icons'
import { useUI } from '@components/ui/context'
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
          <li className={s.item}>
            {customer ? (
              <DropdownMenu />
            ) : (
              <a
                onClick={() => {
                  setModalView('LOGIN_VIEW')
                  openModal()
                }}
                aria-label="Wishlist"
              >
                <User />
              </a>
            )}
          </li>
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
          <li className={cn(s.item, s.itemhidden)} onClick={toggleSidebar}>
            <Search />
          </li>
          {process.env.COMMERCE_WISHLIST_ENABLED && (
            <li className={cn(s.item, 'hidden lg:block')}>
              <Link href="/wishlist">
                <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                  <Heart />
                </a>
              </Link>
            </li>
          )}
          <li
            onClick={() => {
              setModalView('MENU')
              openSidebar()
            }}
            className={s.item}
          >
            <Menu />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default UserNav
