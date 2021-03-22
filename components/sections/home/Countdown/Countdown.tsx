import React, { FC, useLayoutEffect, useState } from 'react'
import s from './Countdown.module.css'
interface Props {
  date: string
}
const Countdown: FC<Props> = ({ date }) => {
  const [[days, hours, minutes, seconds], setCountdown] = useState([0, 0, 0, 0])
  const [EXPIRED, setEXPIRED] = useState(false)
  useLayoutEffect(() => {
    let countDownDate = new Date(date).getTime()
    // Update the count down every 1 second
    let x = setInterval(function () {
      // Get today's date and time
      let now = new Date().getTime()

      // Find the distance between now and the count down date
      let distance = countDownDate - now

      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24))
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      let seconds = Math.floor((distance % (1000 * 60)) / 1000)

      // Display the result in the element with id="demo"
      setCountdown([days, hours, minutes, seconds])

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x)
      }
    }, 1000)
    return () => {
      clearInterval(x)
    }
  }, [date])
  return (
    <div className="mt-6 xl:mt-10 max-w-sm flex items-start space-x-6">
      {EXPIRED && (
        <div className="text-xl md:text-3xl xl:text-5xl text-red font-light">
          EXPIRED
        </div>
      )}
      <div className="flex flex-col items-center space-y-4">
        <div
          style={{ minWidth: '2em' }}
          className="text-center text-xl md:text-3xl xl:text-5xl font-prata font-light"
        >
          {days}{' '}
        </div>
        <div className="font-semibold text-sm xl:text-xl">DAYS</div>
      </div>
      <div className="leading-4 text-xl md:text-3xl xl:text-5xl font-light">
        :
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div
          style={{ minWidth: '2em' }}
          className="text-center text-xl md:text-3xl xl:text-5xl font-prata font-light"
        >
          {hours}
        </div>
        <div className="font-semibold text-sm xl:text-xl">HOURS</div>
      </div>
      <div className="leading-4 text-xl md:text-3xl xl:text-5xl font-light">
        :
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div
          style={{ minWidth: '2em' }}
          className="text-center text-xl md:text-3xl xl:text-5xl font-prata font-light"
        >
          {minutes}
        </div>
        <div className="font-semibold text-sm xl:text-xl">MINS</div>
      </div>
      <div className="leading-4 text-xl md:text-3xl xl:text-5xl font-light">
        :
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div
          style={{ minWidth: '2em' }}
          className="text-center text-xl md:text-3xl xl:text-5xl font-prata font-light"
        >
          {seconds}
        </div>
        <div className="font-semibold text-sm xl:text-xl">SECS</div>
      </div>
    </div>
  )
}
export default Countdown
