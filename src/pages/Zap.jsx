import React, { useState, useEffect } from 'react'
import { START_PRESALE } from 'config/config'
import { MdOutlineSwapHorizontalCircle } from 'react-icons/md'
import farms from 'config/farms'
import { useAccount, erc20ABI, useContractRead } from 'wagmi'
import { ethers } from 'ethers'
import ZapperDepositModal from 'components/ZapperDepositModal'
import lpTokenAbi from 'config/abi/lpToken'

export default function Zap() {
  const [started, setStated] = useState(false)
  const { address } = useAccount()

  const [tokenA, setTokenA] = useState(farms[0])
  const [availableA, setAvailableA] = useState(0)

  const [tokenB, setTokenB] = useState(farms[1])
  const [availableB, setAvailableB] = useState(0)

  const tokenABI = (token) => {
    return token?.isTokenOnly ? erc20ABI : lpTokenAbi
  }

  const tokenABalanceRead = useContractRead({
    address: tokenA.lpAddresses,
    abi: tokenABI(tokenA),
    functionName: 'balanceOf',
    args: [address || '0x000000000000000000000000000000000000dead'],
    chainId: 8453,

    onSuccess(data) {
      console.log('Success', data)
    },
  })

  const tokenBBalanceRead = useContractRead({
    address: tokenB.lpAddresses,
    abi: tokenABI(tokenB),
    functionName: 'balanceOf',
    args: [address || '0x000000000000000000000000000000000000dead'],
    chainId: 8453,

    onSuccess(data) {
      console.log('Success', data)
    },
  })

  const handleChangeToken = (e, type) => {
    if (type === '1') {
      setTokenA(farms[Number(e)])
    } else {
      setTokenB(farms[Number(e)])
    }
  }

  const handleReverse = () => {
    const temp = tokenA
    setTokenA(tokenB)
    setTokenB(temp)
  }

  const updateUI = async () => {
    try {
      const rdep = (tokenABalanceRead.data || 0).toString()

      setAvailableA(
        tokenA.lpSymbol == 'USDC' || tokenA.lpSymbol == 'USDT'
          ? ethers.utils.formatUnits(rdep, 6)
          : ethers.utils.formatEther(rdep)
      )
    } catch {}
    try {
      const read1 = (tokenBBalanceRead.data || 0).toString()
      setAvailableB(
        tokenB.lpSymbol == 'USDC' || tokenB.lpSymbol == 'USDT'
          ? ethers.utils.formatUnits(read1, 6)
          : ethers.utils.formatEther(read1)
      )
    } catch {}
  }

  useEffect(() => {
    updateUI()

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

  return (
    <div className='container'>
      <div className='presale_banner pb-16'>ZAPPER</div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pb-16'>
        <div className='flex justify-center'>
          <div className='w-full max-w-[400px] bg-primary p-4 rounded-lg border border-gray-600'>
            <p className='font-semibold text-center text-xl'>Input Token</p>

            {tokenA?.isTokenOnly ? (
              <img
                src={tokenA?.logoA}
                alt='token'
                className='rounded-full my-6 lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] mx-auto border-[3px] border-white'
              />
            ) : (
              <div className='lg:h-[90px] h-[60px] my-6 relative'>
                <img
                  src={tokenA?.logoA}
                  alt='token'
                  className='rounded-full lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] absolute left-1/2 -translate-x-[80%]  mx-auto border-[3px] border-white'
                />
                <img
                  src={tokenA?.logoB}
                  alt='token'
                  className='rounded-full lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] absolute left-1/2 -translate-x-[30%] mx-auto border-[3px] border-white'
                />
              </div>
            )}

            <div className='bg-secondary-700 rounded-full p-2 flex mb-2'>
              <select
                name='tokenA'
                className='bg-transparent focus-visible:outline-none w-full cursor-pointer'
                onChange={(e) => handleChangeToken(e.target.value, '1')}
              >
                {farms.map((item, key) => {
                  return (
                    <option
                      key={key}
                      className='bg-secondary-700'
                      value={key}
                      disabled={item?.lpSymbol === tokenB?.lpSymbol}
                    >
                      {item?.lpSymbol}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className='text-center'>
              {tokenA.lpSymbol} Available : {availableA}
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <MdOutlineSwapHorizontalCircle
            onClick={handleReverse}
            className='text-[80px] cursor-pointer scale-100 hover:scale-105 transition ease-in-out rotate-90 md:rotate-180'
          />
        </div>

        <div className='flex justify-center'>
          <div className='w-full max-w-[400px] bg-primary p-4 rounded-lg border border-gray-600'>
            <p className='font-semibold text-center text-xl'>Input Token</p>

            {tokenB?.isTokenOnly ? (
              <img
                src={tokenB?.logoA}
                alt='token'
                className='rounded-full my-6 lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] mx-auto border-[3px] border-white'
              />
            ) : (
              <div className='lg:h-[90px] h-[60px] my-6 relative'>
                <img
                  src={tokenB?.logoA}
                  alt='token'
                  className='rounded-full lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] absolute left-1/2 -translate-x-[80%]  mx-auto border-[3px] border-white'
                />
                <img
                  src={tokenB?.logoB}
                  alt='token'
                  className='rounded-full lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] absolute left-1/2 -translate-x-[30%] mx-auto border-[3px] border-white'
                />
              </div>
            )}

            <div className='bg-secondary-700 rounded-full p-2 flex mb-2'>
              <select
                name='tokenB'
                className='bg-transparent focus-visible:outline-none w-full cursor-pointer'
                onChange={(e) => handleChangeToken(e.target.value, '2')}
              >
                {farms.map((item, key) => {
                  return (
                    <option
                      key={key}
                      className='bg-secondary-700'
                      value={key}
                      disabled={item?.lpSymbol === tokenA?.lpSymbol}
                    >
                      {item.lpSymbol}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className='text-center'>
              {tokenB.lpSymbol} Available : {availableB}
            </div>
          </div>
        </div>
      </div>
      <ZapperDepositModal
        tokenA={tokenA}
        tokenB={tokenB}
        availableA={availableA}
        availableB={availableB}
      />
    </div>
  )
}
