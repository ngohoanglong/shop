import { Product } from '@commerce/types'
import { Plus } from '@components/icons'
import Link from '@components/ui/Link'
import Image from 'next/image'
import React from 'react'
import s from './Article.module.css'
const placeholderImg = '/product-img-placeholder.svg'
interface Props {
  className?: string
  article: Product
  tags: any[]
}
const Article: React.FC<Props> = ({ article, tags }) => (
  <div
    data-testid="Article"
    className="group col-span-1 flex-1 w-full h-full space-y-3 flex flex-col space-y-md"
  >
    <Link href={article.path || ''}>
      <div className="flex relative items-center w-full bg-gray-100">
        <div style={{ paddingTop: '70%', width: '100%' }} />
        <Image
          layout="fill"
          objectFit="cover"
          quality="85"
          src={article.images[0].url || placeholderImg}
          alt={article.name || 'Product Image'}
        />
        <div className=" flex justify-center items-center space-x-3  absolute right-0 bottom-0 overflow-hidden">
          <div className="space-x-2 px-4 translate-x-full group-hover:translate-x-0 transform transition-all duration-500 ease-in-out bg-0 py-3 cursor-pointer leading-none inline-flex items-center">
            <div>Read more</div>
            <div className="translate-x-full group-hover:translate-x-0 transform transition-all duration-1000 ease-in-out ">
              <Plus />
            </div>
          </div>
        </div>
      </div>
    </Link>
    <h2 className="font-semibold text-xl">{article.name}</h2>
    <div>
      <div className="w-20 border-t xl:border-t-2 border-accents-5" />
    </div>
    {tags && (
      <div className="flex space-x-3 text-accents-5">
        {tags[0] && (
          <Link href={tags[0].path}>
            <div className="hover:underline hover:text-primary">
              <span>{tags[0].title}</span>
            </div>
          </Link>
        )}
        {tags[0] && <div>/</div>}
        {tags[1] && (
          <Link href={tags[1].path}>
            <div className="hover:underline hover:text-primary">
              <span>{tags[1].title}</span>
            </div>
          </Link>
        )}
        {tags[1] && <div>/</div>}
        {tags[2] && (
          <Link href={tags[2].path}>
            <div className="hover:underline hover:text-primary">
              <span>{tags[2].title}</span>
            </div>
          </Link>
        )}
      </div>
    )}
  </div>
)
export default Article
