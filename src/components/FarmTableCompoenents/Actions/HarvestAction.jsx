import React, { useState } from 'react'
import { Skeleton, Text } from 'uikit'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { usePriceWILDXUsdc } from 'state/hooks'
import { useHarvest } from 'hooks/useHarvest'
import { useTranslation } from 'contexts/Localization'
import { useAccount } from 'wagmi'
import { Earned } from './styles'
import { Tooltip } from 'react-tooltip'

const HarvestAction = ({ pid, userData, userDataReady }) => {
  const earningsBigNumber = new BigNumber(userData.earnings)
  const wildPrice = usePriceWILDXUsdc()
  let earnings = BIG_ZERO
  let earningsUsdt = 0
  let displayBalance = userDataReady ? (
    earnings.toLocaleString()
  ) : (
    <Skeleton width={60} />
  )

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
    earningsUsdt = earnings.multipliedBy(wildPrice).toNumber()
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { address } = useAccount()

  return (
    <div className='flex flex-row items-center  justify-between md:justify-around gap-4  p-2 lg:p-4 w-full'>
      <div className='flex flex-col justify-between gap-2 w-full'>
        <div className='text-white text-md font-semibold'>
          WILDX &nbsp;
          {t('Earned')}
        </div>
        <Earned>{displayBalance}</Earned>
        {earningsUsdt > 0 && (
          <Balance
            fontSize='14px'
            color='white'
            decimals={2}
            value={earningsUsdt}
            unit=' USD'
            prefix='~'
          />
        )}
      </div>
      <div className='flex flex-col justify-center gap-2 lg:min-w-[180px]'>
        <button
          disabled={earnings.eq(0) || pendingTx || !userDataReady}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            dispatch(fetchFarmUserDataAsync({ address, pids: [pid] }))
            setPendingTx(false)
          }}
          className='rounded-md p-1  text-center text-white font-medium bg-green-600 hover:bg-green-500'
        >
          {t('Harvest')}
        </button>
        <div className='flex flex-col lg:flex-row gap-2 w-full'>
          <button
            className='rounded-md w-full lg:w-1/2 px-2 py-1  text-center text-white font-medium bg-blue-600 hover:bg-blue-500'
            data-tooltip-id='compound-tooltip'
            data-tooltip-content='Restake your profit in 2WILD inside 2WILD Staking pool'
            disabled={earnings.eq(0) || pendingTx || !userDataReady}
            onClick={async () => {
              setPendingTx(true)
              await onReward()
              dispatch(fetchFarmUserDataAsync({ address, pids: [pid] }))
              setPendingTx(false)
            }}
          >
            {t('Compound')}
          </button>
          <button
            className='rounded-md w-full lg:w-1/2 px-2 py-1 text-center font-medium bg-blue-600 hover:bg-blue-500'
            data-tooltip-id='zap-tooltip'
            data-tooltip-content='Restake your profit in 2WILD inside any Farming pool'
            disabled={earnings.eq(0) || pendingTx || !userDataReady}
            onClick={async () => {
              setPendingTx(true)
              await onReward()
              dispatch(fetchFarmUserDataAsync({ address, pids: [pid] }))
              setPendingTx(false)
            }}
          >
            {t('Zap in')}
          </button>
          <Tooltip id='compound-tooltip' />
          <Tooltip id='zap-tooltip' />
        </div>
      </div>
    </div>
  )
}

export default HarvestAction
