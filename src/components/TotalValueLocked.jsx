import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { useTotalSupply, useWILDPerSecond } from 'hooks/useTokenBalance'
import { usePriceWILDUsdc, useTotalValue } from 'state/hooks'
import CardValue from './FarmStackingComponents/CardValue'
import { Skeleton } from 'uikit'
import { convertCurrency } from 'utils/customHelpers'

export default function TotalValueLocked() {
  const { t } = useTranslation()
  const tvlData = useTotalValue()
  const tvl = tvlData
    ? tvlData.toLocaleString('en-US', { maximumFractionDigits: 1 })
    : null
  const wildUsdcPrice = usePriceWILDUsdc().toNumber()
  const totalSupply = useTotalSupply()
  const wildPerSecond = useWILDPerSecond()

  const totalMinted = totalSupply
  const marketCap = totalSupply * wildUsdcPrice
  return (
    <div className='flex-1 main_bg p-8 rounded-md'>
      <div className='text-3xl text-right'>Total Value Locked</div>
      <div className=''>
        {tvlData ? (
          <div color='#fff' className='text-xl'>
            {`$${tvl}`} staked
          </div>
        ) : (
          <Skeleton height={66} />
        )}
      </div>
      <div className='text-3xl text-right mb-10'>WILD Stats</div>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <p>Market cap</p>
          <p className='h-30 '>
            {marketCap > 0 ? (
              <div className='text-[20px] font-semibold'>
                $ {convertCurrency(marketCap)}
              </div>
            ) : (
              <Skeleton width={80} height={30} />
            )}
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Circulating Supply</p>
          <p>
            {totalSupply && (
              <CardValue
                fontSize='20px'
                value={totalSupply}
                decimals={1}
                color='#fffff1'
              />
            )}
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Total Minted</p>
          <p>
            {totalMinted && (
              <CardValue
                fontSize='20px'
                decimals={1}
                value={totalMinted}
                color='#fffff1'
              />
            )}
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p>New WILD/second</p>
          <p>
            {' '}
            <CardValue
              fontSize='20px'
              decimals={1}
              value={wildPerSecond}
              color='#fffff1'
            />
          </p>
        </div>
      </div>
    </div>
  )
}
