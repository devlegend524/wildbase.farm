import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { useTotalSupply, useWILDXPerSecond } from 'hooks/useTokenBalance'
import { usePriceWILDXUsdc, useTotalValue, usePriceEthUsdc } from 'state/hooks'
import CardValue from './FarmStackingComponents/CardValue'
import { Skeleton } from 'uikit'
import { convertCurrency, toReadableAmount } from 'utils/customHelpers'
import { useContractRead, erc20ABI } from 'wagmi';
import { getWILDXAddress, getWethAddress } from 'utils/addressHelpers'
import wildABI from 'config/abi/wild.json'

export default function TotalValueLocked() {
  const { t } = useTranslation()
  const tvlData = useTotalValue()
  const tvl = tvlData
    ? tvlData.toLocaleString('en-US', { maximumFractionDigits: 1 })
    : 0
  const wildUsdcPrice = usePriceWILDXUsdc().toNumber()
  const wethPrice = usePriceEthUsdc().toNumber()

  const totalSupply = useTotalSupply()
  const wildxPerBlock = useWILDXPerSecond()
  // 0xeAA13b4f85A98E6CcaF65606361BD590e98DE2Cb
  const tokenABalanceRead = useContractRead({
    address: getWILDXAddress(),
    abi: wildABI,
    functionName: 'balanceOf',
    args: ['0x000000000000000000000000000000000000dead'],
    chainId: 8453
  })
  const wildxBalanceRead = useContractRead({
    address: getWILDXAddress(),
    abi: wildABI,
    functionName: 'balanceOf',
    args: ['0xeAA13b4f85A98E6CcaF65606361BD590e98DE2Cb'],
    chainId: 8453
  })
  const wethBalanceRead = useContractRead({
    address: getWethAddress(),
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: ['0xeAA13b4f85A98E6CcaF65606361BD590e98DE2Cb'],
    chainId: 8453
  })


  const totalMinted = totalSupply - toReadableAmount(tokenABalanceRead?.data, 18)
  const liquidity = toReadableAmount(wildxBalanceRead?.data, 18) * wildUsdcPrice * 0.98 + toReadableAmount(wethBalanceRead?.data, 18) * wethPrice
  const marketCap = totalMinted * wildUsdcPrice
  return (
    <div className='flex-1 main_bg p-8 rounded-md'>
      <div className='text-3xl text-right'>Total Value Locked</div>
      <div className='mb-10'>
        {tvlData !== null ? (
          <div color='#fff' className='text-2xl font-semibold text-right pb-3'>
            {`$${tvl}`} staked
          </div>
        ) : (
          <Skeleton height={66} />
        )}
      </div>
      <div className='text-3xl text-right mb-5'>WILDX Stats</div>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <p className='font-semibold'>Liquidity</p>
          <div className='h-30 '>
            {liquidity > 0 ? (
              <span className='text-[20px] font-semibold'>
                $ {convertCurrency(liquidity)}
              </span>
            ) : (
              <Skeleton width={80} height={30} />
            )}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <p className='font-semibold'>Market Cap</p>
          <div className='h-30 '>
            {marketCap > 0 ? (
              <span className='text-[20px] font-semibold'>
                $ {convertCurrency(marketCap)}
              </span>
            ) : (
              <Skeleton width={80} height={30} />
            )}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <p className='font-semibold'>Total Burned</p>
          <div>
            {toReadableAmount(tokenABalanceRead?.data, 18) && (
              <CardValue
                fontSize='20px'
                decimals={1}
                value={Number(toReadableAmount(tokenABalanceRead?.data, 18))}
                color='#fffff1'
              />
            )}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <p className='font-semibold'>Circulating Supply</p>
          <div>
            {totalSupply && (
              <CardValue
                fontSize='20px'
                value={totalMinted}
                decimals={1}
                color='#fffff1'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
