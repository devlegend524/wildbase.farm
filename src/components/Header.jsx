import React, { useState, useEffect } from 'react'
import { HeaderLinks } from 'config/config'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Fade as Hamburger } from 'hamburger-react'
import { usePriceWILDUsdc } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'

export default function Header() {
  const currentURL = window.location.pathname
  const [open, setOpen] = useState(false)
  const [tokenPrice, setTokenPrice] = useState(false)
  const wildPrice = usePriceWILDUsdc()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    if (Number(wildPrice.toString()) !== 0.6) {
      setTokenPrice(Number(wildPrice.toString()).toFixed(4))
      localStorage.setItem(
        'tokenPrice',
        Number(wildPrice.toString()).toFixed(4)
      )
    } else {
      setTokenPrice(localStorage.getItem('tokenPrice'))
    }
  }, [fastRefresh])

  const showNav = () => {
    setOpen(!open)
  }
  return (
    <header className='flex justify-between items-center p-1 h-[100px]'>
      <div>
        <div className='block md:hidden' onClick={() => showNav()}>
          <Hamburger />
        </div>
        <img src='/logo.png' alt='logo' className='hidden md:block w-[100px]' />
      </div>
      <div className='hidden xl:flex gap-4 absolute left-1/2 -translate-x-1/2'>
        {HeaderLinks.map((item, index) => (
          <a
            href={item.link}
            key={index}
            className={`p-3 hover:border-b-4 hover:boder-sky-400 ${
              currentURL === item.link ? 'border-b-4 border-sky-500' : ''
            } `}
          >
            <div>{item.name}</div>
          </a>
        ))}
        <a
          href='https://docs.wildbase.farm'
          target='_blank'
          className={`p-3`}
          rel='noopener noreferrer'
        >
          {' '}
          Docs
        </a>
      </div>
      <div className='flex gap-2 mr-3'>
        <div className='flex items-center'>
          <img src='/logo.png' alt='logo' className='w-[30px]' />
          <div className='mx-2'>{tokenPrice}</div>
        </div>
        <ConnectButton />
      </div>
      {open && (
        <div className='flex absolute justify-center top-16 left-1/2 -translate-x-1/2 bg-gray-900 w-full'>
          {HeaderLinks.map((item, index) => (
            <a
              href={item.link}
              key={index}
              className={`p-2 hover:border-b-4 hover:boder-sky-400 ${
                currentURL === item.link ? 'border-b-4 border-sky-500' : ''
              } `}
            >
              <div>{item.name}</div>
            </a>
          ))}
          <a
            href='https://docs.wildbase.farm'
            target='_blank'
            className={`p-2`}
            rel='noopener noreferrer'
          >
            Docs
          </a>
        </div>
      )}
    </header>
  )
}
