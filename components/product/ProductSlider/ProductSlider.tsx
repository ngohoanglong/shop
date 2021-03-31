import React, {
  Children,
  FC,
  forwardRef,
  isValidElement,
  Ref,
  RefObject,
} from 'react'
import s from './ProductSlider.module.css'
import cn from 'classnames'

import { useKeenSlider } from 'keen-slider/react'
interface Props {
  children?: Element[]
}
const Slider = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <div ref={ref} className="keen-slider">
      {Children.map(children, (child) => {
        // Add the keen-slider__slide className to children
        return <div className={cn('keen-slider__slide')}>{child}</div>
      })}
    </div>
  )
})
const ProductSlider: React.FC = ({ children }) => {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
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
    <div className={s.root} data-testid="ProductSlider">
      <button
        className={cn(s.leftControl, s.control)}
        onClick={slider?.prev}
        aria-label="Previous Product Image"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
            clipRule="evenodd"
          ></path>
          <path
            fillRule="evenodd"
            d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <button
        className={cn(s.rightControl, s.control)}
        onClick={slider?.next}
        aria-label="Next Product Image"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
            clipRule="evenodd"
          ></path>
          <path
            fillRule="evenodd"
            d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <Slider ref={sliderRef}>{children as any}</Slider>
    </div>
  )
}
export default ProductSlider
