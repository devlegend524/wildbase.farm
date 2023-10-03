import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { useTotalSupply, useWILDXPerSecond } from 'hooks/useTokenBalance'
import { usePriceWILDXUsdc, useTotalValue } from 'state/hooks'
import CardValue from './FarmStackingComponents/CardValue'
import { Skeleton } from 'uikit'
import { convertCurrency, toReadableAmount } from 'utils/customHelpers'
import { useContractRead } from 'wagmi';
import { getWILDXAddress } from 'utils/addressHelpers'
import wildABI from 'config/abi/wild.json'

export default function TotalValueLocked() {
  const { t } = useTranslation()
  const tvlData = useTotalValue()
  const tvl = tvlData
    ? tvlData.toLocaleString('en-US', { maximumFractionDigits: 1 })
    : 0
  const wildUsdcPrice = usePriceWILDXUsdc().toNumber()
  const totalSupply = useTotalSupply()
  const wildxPerBlock = useWILDXPerSecond()

  const tokenABalanceRead = useContractRead({
    address: getWILDXAddress(),
    abi: wildABI,
    functionName: 'balanceOf',
    args: ['0x000000000000000000000000000000000000dead'],
    chainId: 8453,
    onSuccess(data) {
      console.log('Success', data)
    },
  })

  const totalMinted = totalSupply - toReadableAmount(tokenABalanceRead?.data, 18)
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
                value={totalMinted}
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
                value={totalSupply}
                color='#fffff1'
              />
            )}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <p>Total Burned</p>
          <div>
            {totalMinted && (
              <CardValue
                fontSize='20px'
                decimals={1}
                value={toReadableAmount(tokenABalanceRead?.data, 18)}
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
