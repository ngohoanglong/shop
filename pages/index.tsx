import { Layout, Navbar, Title } from '@components/common'
import { ProductCard } from '@components/product'
import ProductSlider from '@components/product/ProductSlider'
import Article from '@components/sections/home/Article'
import Countdown from '@components/sections/home/Countdown'
import HeroSlider from '@components/sections/home/HeroSlider'
import Subscribe from '@components/subscribe/Subscribe'
import { Button, Container } from '@components/ui'
import Link from '@components/ui/Link'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'
import getSiteInfo from '@framework/common/get-site-info'
import getAllProducts from '@framework/product/get-all-products'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import React from 'react'
import { renderToString } from 'react-dom/server'

const placeholderImg = '/product-img-placeholder.svg'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const { products } = await getAllProducts({
    variables: { first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  return {
    props: {
      products,
      hero: [
        {
          title: 'Create Your Own',
          subTitle: 'New Arrivals',
          description: null,
          buttonText: 'See Our News',
          path: '#',
          imageUrl: '/home-default-1.jpg',
        },
        {
          title: 'Stools with Style',
          subTitle: 'Kitchen',
          description: null,
          buttonText: 'Explore Now',
          path: '#',
          imageUrl: '/home-default-2.jpg',
        },
        {
          title: 'New Arrivals',
          subTitle: 'Living room',
          description: null,
          buttonText: 'Explore Now',
          path: '#',
          imageUrl: '/home-default-3.jpg',
        },
      ],
      categories,
      featured: [products[0], products[1], products[2]],
      blogs: [products[0], products[1], products[2]].map((p) => ({
        ...p,
        tags: [
          {
            path: '/search?q=' + 'October 15, 2020',
            title: 'October 15, 2020',
          },
          { path: '/search?q=' + 'Hastheme', title: 'Hastheme' },
          { path: '/search?q=' + 'Chair', title: 'Chair' },
        ],
      })),
      brands,
      bestSelling: products.map((p, i) => ({
        ...p,
        ...(i === 0
          ? {
              label: {
                position: 'top right',
                text: 'Out Of Stock',
                variant: 'out-of-stock',
              },
            }
          : i === 3
          ? {
              label: {
                position: 'top right',
                text: '-14%',
                variant: 'discount',
              },
            }
          : {}),
      })),
      countdown: {
        title: renderToString(
          <>
            Deco Collection <span className="text-red">50% OFF</span>
          </>
        ),
        content: `The standard chunk of Lorem Ipsum used since the 1500s is
        reproduced for those. Sections 1.10.32 and 1.10.33 from “de
        Finibus Bonorum et Malorum`,
        date: 'Jan 5, 2022 15:37:25',
        path: '#',
      },
      pages,
    },
    revalidate: 14400,
  }
}

export default function Home({
  hero,
  featured,
  countdown,
  bestSelling,
  blogs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="w-full space-y-12">
      <HeroSlider list={hero}></HeroSlider>
      {featured &&
        featured.map((product, i) => {
          const left = i % 2 === 0
          if (left) {
            return (
              <Container key={i + 1} className="bg-accents-0">
                <div className="flex items-center w-full lg:py-6 flex-shrink-0 flex-col md:flex-row bg-accents-0 relative">
                  <div className="flex bg-accents-0 relative items-center lg:w-1/2 w-full h-full object-cover">
                    <div style={{ paddingTop: '100%', width: '100%' }} />
                    <Image
                      layout="fill"
                      objectFit="contain"
                      quality="85"
                      src={product.images[0].url || placeholderImg}
                      alt={product.name || 'Product Image'}
                    />
                  </div>
                  <div className="relative lg:w-1/2 w-full flex flex-col justify-center">
                    <Title small subTitle="FEATURED PRODUCT">
                      {product.name}
                    </Title>
                    <div className="w-full">
                      <p
                        className="mt-6 max-w-sm lg:mx-w-lg xl:max-w-xl lg:text-lg xl:text-xl"
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      ></p>
                    </div>
                    <div className="mt-6">
                      <Link href={product.path || '#'}>
                        <Button secondary>
                          Only
                          <span>
                            {' '}
                            {product.price.value}
                            &nbsp;
                            {product.price.currencyCode}
                          </span>
                          <svg
                            className="inline-block ml-2 text-xl"
                            stroke="currentColor"
                            fill="none"
                            strokeWidth={0}
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Container>
            )
          }
          return (
            <div key={i + 1}>
              <div className="flex items-center justify-center w-full  lg:py-32 flex-shrink-0 flex-col py-20 bg-accents-0 relative">
                <div className="absolute right-0 top-0 flex bg-accents-0 items-center w-1/2 h-full object-cover">
                  <Image
                    layout="fill"
                    objectFit="contain"
                    quality="85"
                    src={product.images[0].url || placeholderImg}
                    alt={product.name || 'Product Image'}
                  />
                </div>
                <Container className="w-full relative px-6 flex flex-col justify-center">
                  <Title small subTitle="FEATURED PRODUCT">
                    {product.name}
                  </Title>
                  <div className="w-full">
                    <p className="mt-6 max-w-sm lg:max-w-lg xl:max-w-xl lg:text-lg xl:text-xl">
                      Many desktop publishing packages and web page editors now
                      use <br />
                      Lorem Ipsum as their default model text
                    </p>
                  </div>
                  <div className="mt-6">
                    <Button secondary>
                      Only
                      <span>
                        {' '}
                        {product.price.value}
                        &nbsp;
                        {product.price.currencyCode}
                      </span>
                      <svg
                        className="inline-block ml-2 text-xl"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth={0}
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Button>
                  </div>
                </Container>
              </div>
            </div>
          )
        })}
      <Container className="py-6 lg:py-12 space-y-6 lg:space-y-10">
        <Title small center>
          Best selling
        </Title>
        <ProductSlider>
          {bestSelling.map((product, i) => {
            return (
              <ProductCard
                key={i}
                label={product.label as any}
                product={product}
              />
            )
          })}
        </ProductSlider>
      </Container>
      {countdown && (
        <div className="flex items-center justify-center w-full  lg:py-32 flex-shrink-0 flex-col py-16 bg-accents-2 relative">
          <div className="absolute right-0 top-0 flex bg-accents-0 items-center w-full h-full">
            <Image
              layout="fill"
              objectFit="cover"
              className="object-cover h-full"
              src={'/countdown.jpg'}
              alt={'Product Image'}
            />
          </div>
          <Container className="w-full relative h-96 px-6 flex flex-col justify-center">
            <Title small>
              <span dangerouslySetInnerHTML={{ __html: countdown.title }} />
            </Title>
            <p className="mt-6 max-w-sm lg:max-w-md xl:max-w-lg lg:text-md xl:text-lg">
              {countdown.content}
            </p>
            <Countdown date={countdown.date} />
            <div className="mt-6 xlmt-10">
              <Link href={countdown.path}>
                <Button>
                  Shop now{' '}
                  <svg
                    className="inline-block ml-2 text-xl"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      )}
      <Container className="py-6 lg:py-12 space-y-6 lg:space-y-10">
        <Title small center>
          Our Blog
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:flex-row gap-4 mt-6">
          {blogs.map((article, i) => {
            return <Article key={i} article={article} tags={article?.tags} />
          })}
        </div>
      </Container>
      <Container>
        <Subscribe />
      </Container>
    </div>
  )
}

Home.Layout = Layout
Home.renderNavbar = () => <Navbar transparent />
