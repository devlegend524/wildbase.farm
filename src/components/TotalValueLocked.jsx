import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { useTotalSupply, useWILDXPerSecond } from 'hooks/useTokenBalance'
import { usePriceWILDXUsdc, useTotalValue } from 'state/hooks'
import CardValue from './FarmStackingComponents/CardValue'
import { Skeleton } from 'uikit'
import { convertCurrency } from 'utils/customHelpers'

export default function TotalValueLocked() {
  const { t } = useTranslation()
  const tvlData = useTotalValue()
  const tvl = tvlData
    ? tvlData.toLocaleString('en-US', { maximumFractionDigits: 1 })
    : 0
  const wildUsdcPrice = usePriceWILDXUsdc().toNumber()
  const totalSupply = useTotalSupply()
  const wildxPerBlock = useWILDXPerSecond()

  const totalMinted = totalSupply
  const marketCap = totalSupply * wildUsdcPrice
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
          <p>Market cap</p>
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
          <p>Circulating Supply</p>
          <div>
            {totalSupply && (
              <CardValue
                fontSize='20px'
                value={totalSupply}
                decimals={1}
                color='#fffff1'
              />
            )}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <p>Total Minted</p>
          <div>
            {totalMinted && (
              <CardValue
                fontSize='20px'
                decimals={1}
                value={totalMinted}
                color='#fffff1'
              />
            )}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <p>New WILDX/second</p>
          <div>
            {' '}
            <CardValue
              fontSize='20px'
              decimals={5}
              value={wildxPerBlock}
              color='#fffff1'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
