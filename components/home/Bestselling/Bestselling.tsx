import React, { Ref, RefObject } from 'react'
import s from './Bestselling.module.css'
import cn from 'classnames'

import { useKeenSlider } from 'keen-slider/react'
const Slider = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    spacing: 10,
    slidesPerView: 1,
    centered: true,
    loop: true,
    mode: 'snap',
    breakpoints: {
      '(min-width: 768px)': {
        slidesPerView: 3,
        mode: 'free-snap',
      },
      '(min-width: 1200px)': {
        slidesPerView: 4,
        mode: 'free-snap',
      },
    },
  })
  return (
    <div ref={sliderRef} className="keen-slider">
      <div className={cn('keen-slider__slide', s.numberSlide, s.numberSlide1)}>
        1
      </div>
      <div className={cn('keen-slider__slide', s.numberSlide, s.numberSlide2)}>
        2
      </div>
      <div className={cn('keen-slider__slide', s.numberSlide, s.numberSlide3)}>
        3
      </div>
      <div className={cn('keen-slider__slide', s.numberSlide, s.numberSlide4)}>
        4
      </div>
      <div className={cn('keen-slider__slide', s.numberSlide, s.numberSlide5)}>
        5
      </div>
      <div className={cn('keen-slider__slide', s.numberSlide, s.numberSlide6)}>
        6
      </div>
    </div>
  )
}
const Bestselling: React.FC = () => (
  <div className={s.root} data-testid="Bestselling">
    <Slider />
  </div>
)
export default Bestselling
