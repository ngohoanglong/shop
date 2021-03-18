import { Layout, Navbar } from '@components/common'
import HeroSlider from '@components/home/HeroSlider'
import { Grid, Marquee, Hero, useUI, Container } from '@components/ui'
import { ProductCard } from '@components/product'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/product/get-all-products'
import getSiteInfo from '@framework/common/get-site-info'
import getAllPages from '@framework/common/get-all-pages'
import React, { useEffect, useLayoutEffect } from 'react'
import Image from 'next/image'

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
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

export default function Home({
  products,
  brands,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <HeroSlider>
        <div key={0}>
          <div className="flex items-center justify-center h-full w-screen lg:h-screen lg:py-32 flex-shrink-0 flex-col py-16 bg-gray-100  relative">
            <img
              src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/hero/home-default-1.jpg"
              className="absolute right-0 top-0 w-full h-full bg-0 object-cover"
            />
            <Container className="w-full relative h-96 px-6 flex flex-col justify-center">
              <h4 className="font-bold text-primary mb-2 lg:text-lg xl:text-xl text-sm max-w-xs">
                CHAIR COLLECTION 2020
              </h4>
              <h1
                style={{ paddingBottom: '0.3em' }}
                className="font-semibold text-3xl lg:text-5xl xl:text-6xl  max-w-sm lg:max-w-xl xl:max-w-2xl"
              >
                Welcome To <br />
                Helendo Store
              </h1>
              <div className="w-full">
                <div
                  style={{ width: '7em' }}
                  className="border-b-4 border-primary"
                />
                <p className="mt-6 max-w-sm lg:max-w-lg xl:max-w-xl lg:text-lg xl:text-xl">
                  Many desktop publishing packages and web page editors now use{' '}
                  <br />
                  Lorem Ipsum as their default model text
                </p>
              </div>
              <div className="mt-6">
                <div className="px-4 bg-black py-2 text-white inline-flex items-center">
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
                </div>
              </div>
            </Container>
          </div>
        </div>
        {new Array(3).fill(products).map((products, i) => {
          const product = products[i]
          return (
            <div key={i + 1}>
              <div className="flex items-center w-screen lg:h-screen lg:py-32 flex-shrink-0 flex-col py-20 bg-0 relative">
                <div className="absolute right-0 top-0 flex bg-0 items-center w-1/2 h-full object-cover">
                  <Image
                    layout="fill"
                    objectFit="contain"
                    quality="85"
                    src={product.images[0].url || placeholderImg}
                    alt={product.name || 'Product Image'}
                  />
                </div>
                <Container className="w-full relative h-96 px-6 flex flex-col justify-center">
                  <h4 className="font-bold text-primary mb-2 lg:text-lg xl:text-xl text-sm max-w-xs">
                    CHAIR COLLECTION 2020
                  </h4>
                  <h1
                    style={{ paddingBottom: '0.3em' }}
                    className="font-semibold text-3xl lg:text-5xl xl:text-6xl max-w-sm lg:max-w-xl xl:max-w-2xl"
                  >
                    {product.name}
                  </h1>
                  <div className="w-full">
                    <div
                      style={{ width: '7em' }}
                      className="border-b-4 border-primary"
                    />
                    <p className="mt-6 max-w-sm lg:max-w-lg xl:max-w-xl lg:text-lg xl:text-xl">
                      Many desktop publishing packages and web page editors now
                      use <br />
                      Lorem Ipsum as their default model text
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="px-4 bg-black py-2 text-white inline-flex items-center">
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
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          )
        })}
      </HeroSlider>
      {new Array(3).fill(products).map((products, i) => {
        const product = products[i]
        const left = i % 2 === 0
        if (left) {
          return (
            <Container key={i + 1} className="bg-0">
              <div className="flex items-center w-full  lg:py-6 flex-shrink-0 flex-col md:flex-row bg-0 relative">
                <div className="flex bg-0 relative items-center lg:w-1/2 w-full h-full object-cover">
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
                  <h4 className="font-bold text-gray-500 mb-2 lg:text-sm xl:text-lg text-xs max-w-xs">
                    CHAIR COLLECTION 2020
                  </h4>
                  <h1
                    style={{ paddingBottom: '0.3em' }}
                    className="font-semibold text-xl lg:text-3xl xl:text-4xl max-w-sm lg:max-w-xl xl:max-w-2xl"
                  >
                    {product.name}
                  </h1>
                  <div className="w-full">
                    <div
                      style={{ width: '7em' }}
                      className="border-b-4 border-primary"
                    />
                    <p className="mt-6 max-w-sm lg:max-w-lg xl:max-w-xl text-sm  xl:text-lg">
                      Many desktop publishing packages and web page editors now
                      use <br />
                      Lorem Ipsum as their default model text
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="px-4 border-primary border py-2 text-primary inline-flex items-center">
                      Only{' '}
                      <span>
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
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          )
        }
        return (
          <div key={i + 1}>
            <div className="flex items-center justify-center w-full lg:h-screen lg:py-32 flex-shrink-0 flex-col py-20 bg-0 relative">
              <div className="absolute right-0 top-0 flex bg-0 items-center w-1/2 h-full object-cover">
                <Image
                  layout="fill"
                  objectFit="contain"
                  quality="85"
                  src={product.images[0].url || placeholderImg}
                  alt={product.name || 'Product Image'}
                />
              </div>
              <Container className="w-full relative px-6 flex flex-col justify-center">
                <h4 className="font-bold text-gray-500 mb-2 lg:text-sm xl:text-lg text-xs max-w-xs">
                  CHAIR COLLECTION 2020
                </h4>
                <h1
                  style={{ paddingBottom: '0.3em' }}
                  className="font-semibold text-xl lg:text-3xl xl:text-4xl max-w-sm lg:max-w-xl xl:max-w-2xl"
                >
                  {product.name}
                </h1>
                <div className="w-full">
                  <div
                    style={{ width: '7em' }}
                    className="border-b-4 border-primary"
                  />
                  <p className="mt-6 max-w-sm lg:max-w-lg xl:max-w-xl lg:text-lg xl:text-xl">
                    Many desktop publishing packages and web page editors now
                    use <br />
                    Lorem Ipsum as their default model text
                  </p>
                </div>
                <div className="mt-6">
                  <div className="px-4 border-primary border py-2 text-primary inline-flex items-center">
                    Only{' '}
                    <span>
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
                  </div>
                </div>
              </Container>
            </div>
          </div>
        )
      })}
    </>
  )
}

Home.Layout = Layout
Home.renderNavbar = () => <Navbar transparent />
