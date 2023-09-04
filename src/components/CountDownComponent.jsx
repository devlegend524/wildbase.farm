import React from 'react'
import Countdown from 'react-countdown'

export default function CountDownComponent({ targetBlockTime, complete }) {
  const renderer = ({ completed, formatted }) => {
    const { days, hours, minutes, seconds } = formatted
    if (completed) {
      // Render a completed state
      complete(true)
      return true
    }
    // Render a countdown
    return (
      <div className='flex gap-2 items-baseline'>
        <div className='text-[40px] font-bold m-1'>{days}</div>D{' '}
        <div className='text-[40px] font-bold m-1'>{hours}</div>H{' '}
        <div className='text-[40px] font-bold m-1'>{minutes}</div>M{' '}
        <div className='text-[40px] font-bold m-1'>{seconds}</div>S
      </div>
    )
  }
  return (
    <div className='text-[20px] mb-[10px]'>
      {targetBlockTime ? (
        <Countdown date={targetBlockTime} renderer={renderer} />
      ) : (
        <div className='w-10 h-[60px]' />
      )}
    </div>
  )
}
