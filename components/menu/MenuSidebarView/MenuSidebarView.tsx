import { FC } from 'react'
import Link from 'next/link'
import s from './MenuSidebarView.module.css'
import { UserNav } from '@components/common'
import { useUI } from '@components/ui/context'
import { Cross } from '@components/icons'
import type { Page } from '@framework/common/get-all-pages'
import { useRouter } from 'next/router'
import getSlug from '@lib/get-slug'
import { Container } from '@components/ui'
interface Props {
  children?: any
  pages?: Page[]
}
const MenuSidebarView: FC<Props> = ({ pages }) => {
  const { sitePages, legalPages } = usePages(pages)
  const { closeSidebar } = useUI()
  const handleClose = () => closeSidebar()
  const error = null
  const success = null

  return (
    <div className={s.root}>
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

      <div className="px-4 pt-6 pb-4 sm:px-6">
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="  hover:text-accents-6 transition ease-in-out duration-150">
                  Home
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="  hover:text-accents-6 transition ease-in-out duration-150">
                  Careers
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/blog">
                <a className="  hover:text-accents-6 transition ease-in-out duration-150">
                  Blog
                </a>
              </Link>
            </li>
            {sitePages.map((page) => (
              <li key={page.url} className="py-3 md:py-0 md:pb-4">
                <Link href={page.url!}>
                  <a className="  hover:text-accents-6 transition ease-in-out duration-150">
                    {page.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <br />
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            {legalPages.map((page) => (
              <li key={page.url} className="py-3 md:py-0 md:pb-4">
                <Link href={page.url!}>
                  <a className="  hover:text-accents-6 transition ease-in-out duration-150">
                    {page.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const LEGAL_PAGES = ['terms-of-use', 'shipping-returns', 'privacy-policy']
function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []
  const legalPages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)

      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return

      if (isLegalPage(slug, locale)) {
        legalPages.push(page)
      } else {
        sitePages.push(page)
      }
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
    legalPages: legalPages.sort(bySortOrder),
  }
}

const isLegalPage = (slug: string, locale?: string) =>
  locale
    ? LEGAL_PAGES.some((p) => `${locale}/${p}` === slug)
    : LEGAL_PAGES.includes(slug)

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}
export default MenuSidebarView
