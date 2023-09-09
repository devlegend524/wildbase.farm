import React, { useState } from 'react'
import CountDownComponent from 'components/CountDownComponent'
import moment from 'moment'
import { START_PRESALE } from 'config/config'

export default function Zap() {
  const [started, setStated] = useState(false)

  const Endime = new Date(
    new Date('8/8/2023 7:00:00 PM EST').toString()
  ).getTime()

  const completed = () => {
    setStated(true)
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center flex-col mt-8'>
        <div className='hero_banner'>Coming Soon</div>
        <div className='hero_title'>
          THE HIGHEST YIELD FARM ON <span className='hero_strong'>BASE</span>
        </div>
      </div>
      <div className='flex'>
        <video autoPlay loop muted>
          <source src='/images/nft.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='m-2 flex flex-col items-center justify-center mb-10'></div>
    </div>
  )
}
