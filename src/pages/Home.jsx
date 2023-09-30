import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import CountDownComponent from 'components/CountDownComponent'
// import MintNFT from 'components/MintNFT'
import moment from 'moment'
import { START_PRESALE } from 'config/config'
export default function Home() {
  const [started, setStated] = useState(false)

  const Endime = new Date(
    new Date('10/2/2023 11:00:00 AM EST').toString()
  ).getTime()

  const completed = () => {
    setStated(true)
  }

  useEffect(() => {
    async function getEthPrice() {
      try {
        const res = await fetch(
          'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
        )
        const result = await res.json()
        localStorage.setItem('ethPrice', new BigNumber(result?.USD))
      } catch (e) { }
    }
    getEthPrice()
  }, [])
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center flex-col mt-8'>
        <div className='hero_banner'>WILDX BASE</div>
        <div className='hero_title'>
          THE HIGHEST YIELD FARM ON <span className='hero_strong'>BASE</span>
        </div>
      </div>
      <div className='flex'>
        <video autoPlay loop muted>
          <source src='/images/nft.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='m-2 flex flex-col items-center justify-center mb-10 text-white'>
        {started ? (
          <a className='hero_strong' href='/farms'>
            Go to Farms
          </a>
        ) : (
          <>
            <div className='hero_strong'>WILDX Farming begins in</div>
            <CountDownComponent
              targetBlockTime={moment.unix(Number(START_PRESALE)).format()}
              complete={completed}
            />
          </>
        )}
      </div>
    </div>
  )
}
