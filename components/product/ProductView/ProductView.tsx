import type { Product } from '@commerce/types'
import { ActionButton, Gallery, Title } from '@components/common'
import { Facebook, GGPlus, Heart, Twitter } from '@components/icons'
import { ProductCard, Swatch } from '@components/product'
import { Button, Container, Modal, Text, useUI } from '@components/ui'
import Link from '@components/ui/Link'
import WishlistButton from '@components/wishlist/WishlistButton'
import { useAddItem } from '@framework/cart'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { FC, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { getVariant, SelectedOptions } from '../helpers'
import ProductSlider from '../ProductSlider'
import s from './ProductView.module.css'
interface Props {
  className?: string
  children?: any
  product: Product
  relatedProducts: Product[]
}

const ProductView: FC<Props> = ({ product, relatedProducts }) => {
  const addItem = useAddItem()
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
  const [open, setOpen] = useState<boolean>()
  const [index, setIndex] = useState<number>(0)
  const handleOpenGallery = (index: number) => {
    setOpen(true)
    setIndex(index)
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
      <div className="bg-accents-1">
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
                      <div key={i} className="group pr-3 pb-3">
                        <div
                          className="w-full  flex relative "
                          style={{ paddingTop: '100%' }}
                        >
                          <div
                            key={image.url}
                            className="background-200 border border-accents-2 group-hover:border-primary group-hover:shadow-outline-normal absolute left-0 top-0 w-full h-full flex-1 fadeIn animated"
                          >
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
                        <div
                          onClick={() => {
                            handleOpenGallery(i)
                          }}
                          className="hidden group-hover:block  right-0 top-0 absolute w-5/6"
                        >
                          <div
                            className="w-full bg-gray-200"
                            style={{ paddingTop: '100%' }}
                          >
                            <div className="absolute top-0 right-0 w-full h-full flex-1 border border-gray-300">
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
                  onClick={() => {
                    handleOpenGallery(0)
                  }}
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
          <div className="break-words w-full max-w-xl ">
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
            <div className="bg-accents-1 border flex focus-within:shadow-outline-normal items-stretch">
              <button className="z-10 w-10 flex justify-center  cursor-pointer hover:shadow-outline-normal items-center text-lg font-semibold p-3">
                -
              </button>
              <input
                type="number"
                pattern="\d*"
                defaultValue={1}
                className="flex-1 appearance-none text-center px-3 w-20 focus:outline-none bg-transparent "
              ></input>
              <button className="z-10 w-10 flex justify-center cursor-pointer hover:shadow-outline-normal items-center text-lg font-semibold p-3">
                +
              </button>
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
          <div className="space-y-6 flex flex-wrap items-baseline space-x-3 space-x-reverse">
            <div>Share this items :</div>
            <div className="flex space-x-4">
              <span className="">
                <Facebook />
              </span>
              <span className="">
                <Twitter />
              </span>
              <span className="">
                <GGPlus />
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
      <Modal
        closable={false}
        noBackgroud
        open={open}
        onClose={() => setOpen(false)}
      >
        <Gallery
          images={product.images}
          onClose={() => setOpen(false)}
          index={index}
        />
      </Modal>
    </div>
  )
}

export default ProductView
