import React from 'react'
import { Text } from 'uikit'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getWILDAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceWILDUsdc } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardUsdValue from './CardUsdValue'
import { useEthersSigner } from 'hooks/useEthers'

const WILDWalletBalance = () => {
  const { t } = useTranslation()
  const signer = useEthersSigner()
  const { balance: wildBalance } = useTokenBalance(getWILDAddress())
  const wildPriceBusd = usePriceWILDUsdc()
  const busdBalance = new BigNumber(getBalanceNumber(wildBalance))
    .multipliedBy(wildPriceBusd)
    .toNumber()

  if (!signer) {
    return (
      <Text color='textDisabled' style={{ lineHeight: '54px' }}>
        {t('Locked')}
      </Text>
    )
  }

  const balanceNumber = getBalanceNumber(wildBalance)

  return (
    <>
      <CardValue value={balanceNumber} color='#493df9' lineHeight='36px' />
      {wildPriceBusd.gt(0) ? <CardUsdValue value={busdBalance} /> : <br />}
    </>
  )
}

export default WILDWalletBalance
