import LoginView from '@components/auth/LoginView'
import CartSidebarView from '@components/cart/CartSidebarView'
import { Footer, Navbar } from '@components/common'
import { MenuSidebarView } from '@components/menu'
import { Button, LoadingDots, Modal, Sidebar } from '@components/ui'
import { useUI } from '@components/ui/context'
import { CommerceProvider } from '@framework'
import type { Page } from '@framework/common/get-all-pages'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import cn from 'classnames'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import s from './Layout.module.css'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: () => <Loading />,
}

const SignUpView = dynamic(
  () => import('@components/auth/SignUpView'),
  dynamicProps
)

const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  dynamicProps
)

const FeatureBar = dynamic(
  () => import('@components/common/FeatureBar'),
  dynamicProps
)

interface Props {
  renderNavbar?: Function
  pageProps: {
    pages?: Page[]
    commerceFeatures: Record<string, boolean>
  }
}

const Layout: FC<Props> = ({
  children,
  renderNavbar,
  pageProps: { commerceFeatures, ...pageProps },
}) => {
  const {
    displaySidebar,
    displayModal,
    closeSidebar,
    closeModal,
    modalView,
  } = useUI()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = 'en-US' } = useRouter()
  return (
    <CommerceProvider locale={locale}>
      <div className={cn(s.root)}>
        {renderNavbar ? renderNavbar() : <Navbar />}
        <main className="fit">{children}</main>
        <Footer pages={pageProps.pages} />

        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={acceptedCookies}
          action={
            <Button className="mx-5" onClick={() => onAcceptCookies()}>
              Accept cookies
            </Button>
          }
        />

        <Sidebar open={displaySidebar} onClose={closeSidebar}>
          {modalView === 'CART' && <CartSidebarView />}
          {modalView === 'MENU' && <MenuSidebarView />}
        </Sidebar>

        <Modal open={displayModal} onClose={closeModal}>
          {modalView === 'LOGIN_VIEW' && <LoginView />}
          {modalView === 'SIGNUP_VIEW' && <SignUpView />}
          {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
        </Modal>
      </div>
    </CommerceProvider>
  )
}

export default Layout
