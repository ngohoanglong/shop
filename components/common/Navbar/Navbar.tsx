import { Searchbar, UserNav } from '@components/common'
import { Container } from '@components/ui'
import Link from 'next/link'
import { FC } from 'react'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
export interface Props {
  transparent?: boolean
}
const Navbar: FC<Props> = ({ transparent }) => (
  <NavbarRoot transparent={transparent}>
    <Container>
      <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
        <div className="justify-center flex-1 hidden lg:flex flex-col order-5 lg:order-none">
          <Searchbar />
          <nav className="hidden ml-6 space-x-4 ">
            <Link href="/search">
              <a className={s.link}>All</a>
            </Link>
            <Link href="/search?q=clothes">
              <a className={s.link}>Clothes</a>
            </Link>
            <Link href="/search?q=accessories">
              <a className={s.link}>Accessories</a>
            </Link>
            <Link href="/search?q=shoes">
              <a className={s.link}>Shoes</a>
            </Link>
          </nav>
        </div>
        <div className="flex items-center flex-1 justify-start lg:justify-center">
          <Link href="/">
            <a className="text-2xl lg:text-4xl font-bold" aria-label="Logo">
              Helendo
            </a>
          </Link>
        </div>
        <div className="flex justify-end flex-1 space-x-8">
          <UserNav />
        </div>
      </div>
    </Container>
  </NavbarRoot>
)

export default Navbar
