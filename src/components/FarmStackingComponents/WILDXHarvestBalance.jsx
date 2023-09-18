import React from 'react'
import { Text } from 'uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { usePriceWILDXUsdc } from 'state/hooks'
import styled from 'styled-components'
import { DEFAULT_TOKEN_DECIMAL } from 'config/config'
import CardValue from './CardValue'
import CardUsdValue from './CardUsdValue'
import { useEthersSigner } from 'hooks/useEthers'

const Block = styled.div`
  margin-bottom: 24px;
  border-radius: 3px;
  padding-left: 5px;

  div {
    color: white;
  }
`

const WILDXHarvestBalance = ({ farmsWithBalance }) => {
  const { t } = useTranslation()
  const signer = useEthersSigner()
  const earningsSum = farmsWithBalance.reduce((accum, earning) => {
    const earningNumber = new BigNumber(earning.balance)
    if (earningNumber.eq(0)) {
      return accum
    }
    return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
  }, 0)
  const wildPriceUsdt = usePriceWILDXUsdc()
  const earningsUsdt = new BigNumber(earningsSum)
    .multipliedBy(wildPriceUsdt)
    .toNumber()

  if (!signer) {
    return (
      <Text color='textDisabled' style={{ lineHeight: '76px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={earningsSum} lineHeight='1.5' />
      {wildPriceUsdt.gt(0) && <CardUsdValue value={earningsUsdt} />}
    </Block>
  )
}

export default WILDXHarvestBalance