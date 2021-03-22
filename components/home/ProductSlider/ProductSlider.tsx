import React, { Children, FC, isValidElement, Ref, RefObject } from 'react'
import s from './ProductSlider.module.css'
import cn from 'classnames'

import { useKeenSlider } from 'keen-slider/react'
const Slider: FC = ({ children }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    spacing: 10,
    slidesPerView: 1,
    centered: false,
    loop: false,
    breakpoints: {
      '(min-width: 600px)': {
        slidesPerView: 2,
        mode: 'free-snap',
      },
      '(min-width: 800px)': {
        slidesPerView: 3,
        mode: 'free-snap',
      },
      '(min-width: 1024px)': {
        slidesPerView: 4,
        mode: 'free-snap',
      },
    },
  })
  return (
    <div ref={sliderRef} className="keen-slider">
      {Children.map(children, (child) => {
        // Add the keen-slider__slide className to children
        return <div className={cn('keen-slider__slide')}>{child}</div>
      })}
    </div>
  )
}
const ProductSlider: React.FC = ({ children }) => (
  <div className={s.root} data-testid="ProductSlider">
    <Slider>{children}</Slider>
  </div>
)
export default ProductSlider
