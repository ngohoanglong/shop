import { Button, Container } from '@components/ui'
import Link from '@components/ui/Link'
import cn from 'classnames'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import React, { FC, useEffect, useRef, useState } from 'react'
import s from './HeroSlider.module.css'
const placeholderImg = '/product-img-placeholder.svg'
const HeroSlider: FC<any> = ({ list }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const [opacities, setOpacities] = React.useState<number[]>([])
  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    slides: list.length,
    loop: true,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })
  console.log(opacities)
  // Stop the history navigation gesture on touch devices
  useEffect(() => {
    const preventNavigation = (event: TouchEvent) => {
      // Center point of the touch area
      const touchXPosition = event.touches[0].pageX
      // Size of the touch area
      const touchXRadius = event.touches[0].radiusX || 0

      // We set a threshold (10px) on both sizes of the screen,
      // if the touch area overlaps with the screen edges
      // it's likely to trigger the navigation. We prevent the
      // touchstart event in that case.
      if (
        touchXPosition - touchXRadius < 10 ||
        touchXPosition + touchXRadius > window.innerWidth - 10
      )
        event.preventDefault()
    }

    sliderContainerRef.current!.addEventListener(
      'touchstart',
      preventNavigation,
      { passive: true }
    )

    return () => {
      if (sliderContainerRef.current) {
        sliderContainerRef.current!.removeEventListener(
          'touchstart',
          preventNavigation
        )
      }
    }
  }, [])

  return (
    <div className={s.root} ref={sliderContainerRef}>
      <div
        ref={ref}
        className="h-full transition-opacity duration-150"
        style={{ opacity: isMounted ? 1 : 0 }}
      >
        {list.map((item: any, idx: number) => {
          // Add the keen-slider__slide className to children
          return (
            <div
              key={idx}
              className={cn(s.faderSlide, {
                [s.current]: currentSlide === idx,
              })}
            >
              <div className="flex items-center justify-center w-full h-screen lg:py-32 flex-shrink-0 flex-col py-20 bg-accents-0 relative">
                <div className="absolute right-0 top-0 flex bg-accents-0 items-center w-full h-full">
                  <Image
                    className="absolute h-full w-full"
                    quality="100"
                    layout="fill"
                    objectFit="cover"
                    src={item.imageUrl || placeholderImg}
                    alt={'Product Image'}
                  />
                </div>
                <Container className="w-full relative h-96 px-6 flex flex-col justify-center">
                  <div className="space-y-lg" data-testid="Title">
                    {item.subTitle && (
                      <h4 className={s.subTitle}>{item.subTitle}</h4>
                    )}
                    <h2 className={s.title}>{item.title}</h2>
                    <div className={s.buttonText}>
                      <Link href={'#'}>
                        <Button variant="link">{item.buttonText}</Button>
                      </Link>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          )
        })}
      </div>
      {slider && (
        <div className={cn(s.positionIndicatorsContainer)}>
          <Container>
            {[...Array(slider.details().size).keys()].map((idx) => {
              return (
                <button
                  aria-label="Position indicator"
                  key={idx}
                  className={cn(s.positionIndicator, {
                    [s.positionIndicatorActive]: currentSlide === idx,
                  })}
                  onClick={() => {
                    slider.moveToSlideRelative(idx)
                  }}
                >
                  <div className={s.dot} />
                </button>
              )
            })}
          </Container>
        </div>
      )}
    </div>
  )
}

export default HeroSlider
