import React, { useState, useEffect } from 'react'
import { START_PRESALE } from 'config/config'
import { MdOutlineSwapHorizontalCircle } from 'react-icons/md'

export default function Zap() {
  const [tokenList, setTokenList] = useState([
    {
      name: 'ARB',
      isLp: false,
      token1: {
        logo: '/images/tokens/arb.svg',
        address: '',
        decimal: '',
      },
      token2: {
        logo: '',
        address: '',
        decimal: '',
      },
    },
    {
      name: 'ETH/Wild',
      isLp: true,
      token1: {
        logo: '/images/tokens/weth.svg',
        address: '',
        decimal: '',
      },
      token2: {
        logo: '/images/tokens/wild.svg',
        address: '',
        decimal: '',
      },
    },
    {
      name: 'USDC',
      isLp: false,
      token1: {
        logo: '/images/tokens/wild.svg',
        address: '',
        decimal: '',
      },
      token2: {
        logo: '',
        address: '',
        decimal: '',
      },
    },
  ])

  const [started, setStated] = useState(false)
  const [tokenA, setTokenA] = useState(tokenList[1])
  const [tokenB, setTokenB] = useState(tokenList[2])

  const handleChangeToken = (e, type) => {
    if (type === '1') {
      setTokenA(tokenList[Number(e)])
    } else {
      setTokenB(tokenList[Number(e)])
    }
  }

  const handleReverse = () => {
    const temp = tokenA
    setTokenA(tokenB)
    setTokenB(temp)
  }

  useEffect(() => {
    const fetchTimer = setInterval(() => {
      if (Date.now() / 1000 >= START_PRESALE) {
        setStated(true)
        clearInterval(fetchTimer)
      }
    }, [3000])

    return () => {
      clearInterval(fetchTimer)
    }
  }, [])

  if (!started) {
    return (
      <div className='container'>
        <div className='presale_banner pb-16'>ZAPPER</div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='flex justify-center'>
            <div className='w-full max-w-[400px] bg-primary p-4 rounded-lg border border-gray-600'>
              <p className='font-semibold text-center text-xl'>Input Token</p>

              {!tokenA.isLp ? (
                <img
                  src={tokenA.token1.logo}
                  alt='token'
                  className='rounded-full my-6 lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] mx-auto border-[3px] border-white'
                />
              ) : (
                <div className='lg:h-[90px] h-[60px] my-6 relative'>
                  <img
                    src={tokenA.token1.logo}
                    alt='token'
                    className='rounded-full lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] absolute left-1/2 -translate-x-[80%]  mx-auto border-[3px] border-white'
                  />
                  <img
                    src={tokenA.token2.logo}
                    alt='token'
                    className='rounded-full lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] absolute left-1/2 -translate-x-[30%] mx-auto border-[3px] border-white'
                  />
                </div>
              )}

              <div className='bg-secondary-700 rounded-full p-2 flex'>
                <select
                  name='tokenA'
                  className='bg-transparent focus-visible:outline-none w-full cursor-pointer'
                  onChange={(e) => handleChangeToken(e.target.value, '1')}
                >
                  {tokenList.map((item, key) => {
                    return (
                      <option
                        key={key}
                        className='bg-secondary-700'
                        value={key}
                        disabled={item.name === tokenB.name}
                      >
                        {item.name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>

          <div
            className='flex justify-center items-center'
            onClick={handleReverse}
          >
            <MdOutlineSwapHorizontalCircle className='text-[80px] cursor-pointer scale-100 hover:scale-105 transition ease-in-out' />
          </div>

          <div className='flex justify-center'>
            <div className='w-full max-w-[400px] bg-primary p-4 rounded-lg border border-gray-600'>
              <p className='font-semibold text-center text-xl'>Input Token</p>

              {!tokenB.isLp ? (
                <img
                  src={tokenB.token1.logo}
                  alt='token'
                  className='rounded-full my-6 lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] mx-auto border-[3px] border-white'
                />
              ) : (
                <div className='lg:h-[90px] h-[60px] my-6 relative'>
                  <img
                    src={tokenB.token1.logo}
                    alt='token'
                    className='rounded-full lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] absolute left-1/2 -translate-x-[80%]  mx-auto border-[3px] border-white'
                  />
                  <img
                    src={tokenB.token2.logo}
                    alt='token'
                    className='rounded-full lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] absolute left-1/2 -translate-x-[30%] mx-auto border-[3px] border-white'
                  />
                </div>
              )}

              <div className='bg-secondary-700 rounded-full p-2 flex'>
                <select
                  name='tokenB'
                  className='bg-transparent focus-visible:outline-none w-full cursor-pointer'
                  onChange={(e) => handleChangeToken(e.target.value, '2')}
                >
                  {tokenList.map((item, key) => {
                    return (
                      <option
                        key={key}
                        className='bg-secondary-700'
                        value={key}
                        disabled={item.name === tokenA.name}
                      >
                        {item.name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
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
}
