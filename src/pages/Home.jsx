import React, { useState } from 'react'
import CountDownComponent from 'components/CountDownComponent'
import MintNFT from 'components/MintNFT'
import moment from 'moment'
export default function Home() {
  const [started, setStated] = useState(false)
  const [startTime, setStartTime] = React.useState(1693872000) // 1693872000
  const completed = () => {
    setStated(true)
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center flex-col mt-8'>
        <div className='hero_banner'>WILD BASE</div>
        <div className='hero_title'>
          THE HIGHEST YIELD FARM ON <span className='hero_strong'>BASE</span>
        </div>
      </div>
      <div className='flex'>
        <video autoPlay loop muted>
          <source src='/images/nft.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='m-2 flex flex-col items-center justify-center mb-10'>
        {started ? (
          <MintNFT />
        ) : (
          <>
            <div className='hero_strong'>SALE STARTS SOON</div>
            <CountDownComponent
              targetBlockTime={moment.unix(startTime).format()}
              complete={completed}
            />
          </>
        )}
      </div>
    </div>
  )
}
