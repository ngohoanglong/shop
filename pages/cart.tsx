import { CartItem } from '@components/cart'
import { Layout } from '@components/common'
import { Bag, Check, CreditCard, Cross, MapPin } from '@components/icons'
import { Button, Container, Text } from '@components/ui'
import { getConfig } from '@framework/api'
import useCart from '@framework/cart/use-cart'
import getAllPages from '@framework/common/get-all-pages'
import usePrice from '@framework/product/use-price'
import type { GetStaticPropsContext } from 'next'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { pages },
  }
}

export default function Cart() {
  const error = null
  const success = null
  const { data, isLoading, isEmpty } = useCart()

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )

  return (
    <>
      <div className="bg-accents-1">
        <Container className="py-6 md:py-12 flex items-center flex-col md:flex-row md:space-x-3 md:items-baseline">
          <h2 className="text-3xl py-1 font-semibold">My cart</h2>
        </Container>
      </div>
      <Container className="grid lg:grid-cols-12 gap-6 lg:gap-12 py-6">
        <div className="lg:col-span-8">
          {isLoading || isEmpty ? (
            <div className="flex-1  py-24 flex flex-col justify-center items-center ">
              <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-accents-3 p-12 rounded-lg text-primary">
                <Bag className="absolute" />
              </span>
              <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                Your cart is empty
              </h2>
              <p className="text-accents-6 px-10 text-center pt-2">
                Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
              </p>
            </div>
          ) : error ? (
            <div className="flex-1  flex flex-col justify-center items-center">
              <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
                <Cross width={24} height={24} />
              </span>
              <h2 className="pt-6 text-xl font-light text-center">
                We couldn’t process the purchase. Please check your card
                information and try again.
              </h2>
            </div>
          ) : success ? (
            <div className="flex-1  flex flex-col justify-center items-center">
              <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
                <Check />
              </span>
              <h2 className="pt-6 text-xl font-light text-center">
                Thank you for your order.
              </h2>
            </div>
          ) : (
            <div className=" flex-1">
              <Text variant="sectionHeading">Review your Order</Text>
              <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-2 border-b border-accents-2">
                {data!.lineItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    currencyCode={data?.currency.code!}
                  />
                ))}
              </ul>
              <div className="my-6 space-y-3">
                <Text>
                  Before you leave, take a look at these items. We picked them
                  just for you
                </Text>
                <div className="grid grid-cols-6 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((x) => (
                    <div
                      key={x}
                      className="border col-span-2 md:col-span-1 border-accents-3 w-full h-24 bg-accents-2 bg-opacity-50 transform cursor-pointer hover:scale-110 duration-75"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="lg:col-span-4">
          <div className="flex-shrink-0 py-12 lg:py-24 ">
            {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED && (
              <>
                {/* Shipping Address */}
                {/* Only available with customCheckout set to true - Meaning that the provider does offer checkout functionality. */}
                <div className="rounded-md border border-accents-2 px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accents-4">
                  <div className="mr-5">
                    <MapPin />
                  </div>
                  <div className="text-sm text-center font-medium">
                    <span className="uppercase">+ Add Shipping Address</span>
                    {/* <span>
                    1046 Kearny Street.<br/>
                    San Franssisco, California
                  </span> */}
                  </div>
                </div>
                {/* Payment Method */}
                {/* Only available with customCheckout set to true - Meaning that the provider does offer checkout functionality. */}
                <div className="rounded-md border border-accents-2 px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accents-4">
                  <div className="mr-5">
                    <CreditCard />
                  </div>
                  <div className="text-sm text-center font-medium">
                    <span className="uppercase">+ Add Payment Method</span>
                    {/* <span>VISA #### #### #### 2345</span> */}
                  </div>
                </div>
              </>
            )}
            <div className="border-t border-accents-2">
              <ul className="py-3">
                <li className="flex justify-between py-1">
                  <span>Subtotal</span>
                  <span>{subTotal}</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>Estimated Shipping</span>
                  <span className="font-bold tracking-wide">FREE</span>
                </li>
              </ul>
              <div className="flex justify-between border-t border-accents-2 py-3 font-bold mb-10">
                <span>Total</span>
                <span>{total}</span>
              </div>
            </div>
            <div className="flex flex-row justify-end">
              <div className="w-full lg:w-72">
                {isEmpty ? (
                  <Button href="/" Component="a" width="100%">
                    Continue Shopping
                  </Button>
                ) : (
                  <Button href="/checkout" Component="a" width="100%">
                    Proceed to Checkout
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

Cart.Layout = Layout
