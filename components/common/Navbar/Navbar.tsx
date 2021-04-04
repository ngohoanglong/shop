import { UserNav } from '@components/common'
import { Menu } from '@components/icons'
import { Container, useUI } from '@components/ui'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
export interface Props {
  transparent?: boolean
}
const Navbar: FC<Props> = ({ transparent }) => {
  const { openSidebar, setModalView } = useUI()
  return (
    <NavbarRoot transparent={transparent}>
      <Container>
        <div className="flex justify-center py-4 align-center md:py-6  lg:h-32 space-x-12">
          <div className="flex-1 lg:flex-none flex items-center">
            <div
              onClick={() => {
                setModalView('MENU')
                openSidebar()
              }}
              className={s.item}
            >
              <Menu />
            </div>
          </div>
          <div className="flex items-center flex-1 justify-center lg:justify-start lg:space-x-16">
            <Link href="/">
              <a className="text-2xl font-bold" aria-label="Logo">
                Helendo
              </a>
            </Link>
            <div className="space-x-12 hidden lg:flex items-center">
              <div className="group">
                <Link href="/home">
                  <a className={cn(s.link, 'z-10')}>home</a>
                </Link>
                <div className="absolute left-0 top-0 pt-32 hidden w-full group-hover:block ">
                  <Container className="w-full grid grid-cols-7 gap-6 py-6 shadow-lg bg-accents-0 relative">
                    {new Array(5).fill(
                      <div className="leading-extra-loose  flex flex-col items-start space-y-3">
                        <div className="uppercase text-sm font-semibold">
                          Group
                        </div>
                        {new Array(8).fill(
                          <div className={cn(s.link, 'inline-block')}>Item</div>
                        )}
                      </div>
                    )}
                    <div className="col-span-2 h-96"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96">
                      <Image
                        layout="intrinsic"
                        width={800}
                        height={800}
                        objectFit="cover"
                        src="/mega-menu.png"
                      ></Image>
                    </div>
                  </Container>
                </div>
              </div>
              <div className="group">
                <Link href="/shop">
                  <a className={s.link}>shop</a>
                </Link>
              </div>
              <div className="group">
                <Link href="/features">
                  <a className={s.link}>features</a>
                </Link>
              </div>
              <div className="group">
                <Link href="/pages">
                  <a className={s.link}>pages</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-end flex-1 lg:flex-none space-x-8">
            <UserNav />
          </div>
        </div>
      </Container>
    </NavbarRoot>
  )
}

export default Navbar
