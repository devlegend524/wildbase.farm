import React, { useState } from 'react'
import { Button, Skeleton, Text } from 'uikit'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { usePriceWILDUsdc } from 'state/hooks'
import { useHarvest } from 'hooks/useHarvest'
import { useTranslation } from 'contexts/Localization'
import { useAccount } from 'wagmi'
import { ActionContainer, ActionTitles, ActionContent, Earned } from './styles'

const HarvestAction = ({ pid, userData, userDataReady }) => {
  const earningsBigNumber = new BigNumber(userData.earnings)
  const wildPrice = usePriceWILDUsdc()
  let earnings = BIG_ZERO
  let earningsBusd = 0
  let displayBalance = userDataReady ? (
    earnings.toLocaleString()
  ) : (
    <Skeleton width={60} />
  )

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
    earningsBusd = earnings.multipliedBy(wildPrice).toNumber()
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { address } = useAccount()

  return (
    <ActionContainer>
      <ActionTitles>
        <Text textTransform='uppercase' color='white' fontSize='12px' pr='4px'>
          WILD
        </Text>
        <Text textTransform='uppercase' color='white' fontSize='12px'>
          {t('Earned')}
        </Text>
      </ActionTitles>
      <ActionContent>
        <div>
          <Earned>{displayBalance}</Earned>
          {earningsBusd > 0 && (
            <Balance
              fontSize='12px'
              color='textSubtle'
              decimals={2}
              value={earningsBusd}
              unit=' USD'
              prefix='~'
            />
          )}
        </div>
        <Button
          disabled={earnings.eq(0) || pendingTx || !userDataReady}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            dispatch(fetchFarmUserDataAsync({ address, pids: [pid] }))
            setPendingTx(false)
          }}
          ml='4px'
          style={{
            background: 'linear-gradient(90deg,#68a7f8 1.82%,#0052ff 100%)',
            color: '#ffffff',
            fontWeight: 500,
          }}
        >
          {t('Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
