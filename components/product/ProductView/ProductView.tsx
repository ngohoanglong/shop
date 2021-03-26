import type { Product } from '@commerce/types'
import { ActionButton } from '@components/common'
import ProductSlider from '@components/home/ProductSlider'
import Title from '@components/home/Title'
import { Heart } from '@components/icons'
import { ProductCard, Swatch } from '@components/product'
import { Button, Container, Text, useUI } from '@components/ui'
import Link from '@components/ui/Link'
import WishlistButton from '@components/wishlist/WishlistButton'
import { useAddItem } from '@framework/cart'
import usePrice from '@framework/product/use-price'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { FC, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { getVariant, SelectedOptions } from '../helpers'
import s from './ProductView.module.css'
interface Props {
  className?: string
  children?: any
  product: Product
  relatedProducts: Product[]
}

const ProductView: FC<Props> = ({ product, relatedProducts }) => {
  const addItem = useAddItem()
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })
  const { openSidebar, setModalView } = useUI()
  const [loading, setLoading] = useState(false)
  const [choices, setChoices] = useState<SelectedOptions>({
    size: null,
    color: null,
  })

  // Select the correct variant based on choices
  const variant = getVariant(product, choices)

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0].id),
      })
      setModalView('CART')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <div className="fit space-y-2xl">
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
      <div className="bg-1">
        <Container className="py-6 md:py-12 flex items-center flex-col md:flex-row md:space-x-3 md:items-baseline">
          <h2 className="text-3xl py-1 font-semibold">Wooden chair</h2>
          <div className="flex py-1 space-x-2 flex-1 font-semibold justify-end">
            <div>HOME</div>
            <div className="text-accents-6">/</div>
            <div className="text-accents-6">FURNITURE</div>
          </div>
        </Container>
      </div>
      <Container className=" grid gap-12 grid-cols-2 ">
        <div className="col-span-2 md:col-span-1">
          <div className="w-full relative" style={{ paddingTop: '80%' }}>
            <div className="absolute w-full h-full top-0 left-0 flex">
              <div className="w-1/6 flex flex-col z-10 ">
                {new Array(5).fill(product.images).map((arr, i) => {
                  const image = arr[i]
                  if (image) {
                    return (
                      <div key={i} className="flex-1 group pr-3 pb-3">
                        <div
                          className="w-full border border-accents-2 relative hover:border-primary border-2 "
                          style={{ paddingTop: '100%' }}
                        >
                          <div className="background-200 absolute left-0 top-0 w-full h-full flex-1 fadeIn animated">
                            <Image
                              src={image.url!}
                              alt={image.alt || 'Product Image'}
                              width={80}
                              objectFit="cover"
                              height={80}
                              priority={i === 0}
                              quality="85"
                            />
                          </div>
                        </div>
                        <div className="group-hover:opacity-100 hidden group-hover:block group-focus:opacity-100 opacity-0 right-0 top-0 absolute w-5/6">
                          <div
                            className="w-full bg-gray-200"
                            style={{ paddingTop: '100%' }}
                          >
                            <div className="hover:shadow absolute top-0 right-0 w-full h-full flex-1 border border-gray-300">
                              <Image
                                className={s.img}
                                src={image.url!}
                                alt={image.alt || 'Product Image'}
                                width={1050}
                                height={1050}
                                priority={i === 0}
                                quality="85"
                                objectFit="cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return <div key={i} className="flex-1" />
                })}
              </div>
              <div className="w-5/6 bg-gray-200">
                <div
                  className="w-full flex-1 relative"
                  style={{ paddingTop: '100%' }}
                >
                  <div className="flex-1 absolute top-0 right-0 w-full h-full fadeIn animated">
                    <Image
                      className={s.img}
                      src={product.images[0]?.url!}
                      alt={product.images[0]?.alt || 'Product Image'}
                      width={1050}
                      height={1050}
                      quality="85"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 space-y-6">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="text-accents-6 text-3xl">
            <span>{product.price.value}</span>{' '}
            <span>{product.price.currencyCode}</span>
          </div>
          <div className="break-words w-full max-w-xl">
            <Text html={product.description} />
          </div>
          <div className="space-y-4">
            {product.options?.map((opt) => (
              <div className="space-y-2" key={opt.displayName}>
                <h2 className="uppercase font-medium">{opt.displayName}</h2>
                <div className="flex flex-row flex-wrap space-y-2 space-y-reverse">
                  {opt.values.map((v, i: number) => {
                    const active = (choices as any)[
                      opt.displayName.toLowerCase()
                    ]
                    return (
                      <Swatch
                        className="flex-shrink-0"
                        key={`${opt.id}-${i}`}
                        active={v.label.toLowerCase() === active}
                        variant={opt.displayName}
                        color={v.hexColors ? v.hexColors[0] : ''}
                        label={v.label}
                        onClick={() => {
                          setChoices((choices) => {
                            return {
                              ...choices,
                              [opt.displayName.toLowerCase()]: v.label.toLowerCase(),
                            }
                          })
                        }}
                      />
                    )
                  })}
                  <div />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap lg:flex-nowrap justify-between">
            <div className="bg-1 border border-2 flex focus-within:shadow-outline-normal items-stretch">
              <div className="cursor-pointer hover:shadow-outline-normal items-center text-lg font-semibold p-3">
                -
              </div>
              <input
                type="text"
                pattern="\d*"
                defaultValue={1}
                className="flex-1 text-center px-3 w-20 focus:outline-none bg-transparent appearance-none"
              ></input>
              <div className="cursor-pointer hover:shadow-outline-normal items-center text-lg font-semibold p-3">
                +
              </div>
            </div>
            <Button
              className="order-1 lg:ml-6 mt-6 lg:mt-0 w-full lg:w-0 m-0 lg:order-none lg:flex-1 flex-none"
              variant="slim"
              aria-label="Add to Cart"
              type="button"
              onClick={addToCart}
              loading={loading}
              disabled={!variant && product.options.length > 0}
            >
              Add to Cart
            </Button>
            <ActionButton
              shape="round"
              className="rounded-none ml-6 border border-current flex-shrink-0"
              tooltip={'add to wishlist'}
            >
              <Heart />
            </ActionButton>
          </div>
          <div className="space-y-2 text-lg font-semibold ">
            <div className="flex items-baseline space-x-3">
              <div>SKU:</div> <div className="text-accents-6">502</div>
            </div>
            <div className="flex items-baseline space-x-3">
              <div>Categories:</div>{' '}
              <div className="text-accents-6">
                <Link href="/search?q=Furniture">Furniture</Link>,{' '}
                <Link href="/search?q=Table">Table</Link>
              </div>
            </div>
            <div className="flex items-baseline space-x-3">
              <div>Tag:</div>{' '}
              <div className="text-accents-6">
                <Link href="/search?q=Pottery">Pottery</Link>
              </div>
            </div>
          </div>
          <div className="space-y-6 flex items-baseline space-x-3">
            <a className=" hover:text-accents-6 transition ease-in-out duration-150">
              Share this items :
            </a>
            <div className="flex space-x-4">
              <span className="">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 320 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                </svg>
              </span>
              <span className="">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                </svg>
              </span>
              <span className="">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 640 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M386.061 228.496c1.834 9.692 3.143 19.384 3.143 31.956C389.204 370.205 315.599 448 204.8 448c-106.084 0-192-85.915-192-192s85.916-192 192-192c51.864 0 95.083 18.859 128.611 50.292l-52.126 50.03c-14.145-13.621-39.028-29.599-76.485-29.599-65.484 0-118.92 54.221-118.92 121.277 0 67.056 53.436 121.277 118.92 121.277 75.961 0 104.513-54.745 108.965-82.773H204.8v-66.009h181.261zm185.406 6.437V179.2h-56.001v55.733h-55.733v56.001h55.733v55.733h56.001v-55.733H627.2v-56.001h-55.733z"></path>
                </svg>
              </span>
              <span></span>
            </div>
          </div>
        </div>
        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <WishlistButton
            className={s.wishlistButton}
            productId={product.id}
            variant={product.variants[0]! as any}
          />
        )}
      </Container>
      <Container>
        <Tabs>
          <TabList className="flex overflow-auto w-full items-center md:items-baseline space-x-6 py-xl mb-xl border-b border-accents-4">
            <Tab
              className="text-sm md:text-lg font-semibold cursor-pointer"
              selectedClassName="text-primary"
            >
              Description
            </Tab>
            <div>/</div>
            <Tab
              className="text-sm md:text-lg font-semibold cursor-pointer"
              selectedClassName="text-primary"
            >
              Addition Infomations
            </Tab>
            <div>/</div>
            <Tab
              className="text-sm md:text-lg font-semibold cursor-pointer"
              selectedClassName="text-primary"
            >
              Reviews
            </Tab>
          </TabList>
          <TabPanel>
            <div className="grid  gap-md grid-cols-5 items-center">
              <div className="col-span-full md:col-span-3">
                <Text className="inline-block" variant="sectionHeading">
                  Detail
                </Text>
                <Text variant="body">
                  Nam libero tempore, cum soluta nobis est eligendi optio cumque
                  nihil impedit quo minus id quod maxime placeat facere
                  possimus, omnis voluptas assumenda est, omnis dolor
                  repellendus. Temporibus autem quibusdam et aut officiis
                  debitis aut rerum omnis voluptas assumenda.
                </Text>
              </div>
              <div className="col-span-full md:col-span-2">
                <Image
                  className={s.img}
                  src={product.images[0]?.url!}
                  alt={product.images[0]?.alt || 'Product Image'}
                  width={1050}
                  height={1050}
                  quality="85"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="my-xl border-b border-accents-4"></div>
            <div className="grid  gap-md grid-cols-5 items-center">
              <div className="col-span-full md:col-span-3">
                <Text className="inline-block" variant="sectionHeading">
                  Features
                </Text>
                <Text variant="body">
                  <ul className="list-disc list-inside">
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </li>
                    <li>
                      Lorem ipsum dolor sit1amet, consectetur adipisicing elit
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </li>
                  </ul>
                </Text>
              </div>
              <div className="col-span-full md:col-span-2">
                <Image
                  className={s.img}
                  src={product.images[1]?.url!}
                  alt={product.images[1]?.alt || 'Product Image'}
                  width={1050}
                  height={1050}
                  quality="85"
                  objectFit="cover"
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-lg">
              <div className="col-span-full md:col-span-1">
                <span className="font-semibold">Weight</span> 1.2 kg
              </div>
              <div className="col-span-full md:col-span-1">
                <span className="font-semibold">Dimensions</span> 12 × 2 × 1.5
                cm
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <Text variant="sectionHeading">
              Be the first to review “Wooden chair”
            </Text>
            <div className="grid grid-cols-2 gap-6 max-w-lg">
              <label className="block col-span-full md:col-span-1">
                <span className="text-gray-700">Your rating</span>
                <div className="flex items-center mt-1">
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="mx-1 w-4 h-4 fill-current text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </div>
              </label>

              <label className="block col-span-full">
                <span className="text-gray-700">
                  Your review <span>*</span>
                </span>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows={4}
                ></textarea>
              </label>
              <label className="block col-span-full md:col-span-1">
                <span className="text-gray-700">
                  Your Name <span>*</span>
                </span>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="john@example.com"
                />
              </label>
              <label className="bloc col-span-full md:col-span-1">
                <span className="text-gray-700">
                  Your Email <span>*</span>
                </span>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="john@example.com"
                />
              </label>
              <div className="block col-span-full mb-6">
                <Button variant="slim">Submit</Button>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </Container>
      <Container>
        <div className="my-xl border-b border-accents-4" />
      </Container>
      <Container className="py-6 lg:py-12 space-y-6 lg:space-y-10">
        <Title small center>
          Related products
        </Title>
        <ProductSlider>
          {relatedProducts.map((product, i) => {
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
    </div>
  )
}

export default ProductView
