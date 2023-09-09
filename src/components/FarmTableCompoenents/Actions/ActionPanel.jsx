import React, { useMemo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { LinkExternal, Text } from 'uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getScanAddressUrl } from 'utils/getExplorerURL'
import { DepositLockDicountTag, NoFeesTag } from 'components/Tags'
import { BASE_ADD_LIQUIDITY_URL, BASE_SWAP_URL, CHAIN_ID } from 'config/config'
import { getAddress } from 'utils/addressHelpers'

import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import Apr from '../Apr'
import Multiplier from '../Multiplier'
import Liquidity from '../Liquidity'

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div`
  animation: ${css`
    ${expandAnimation} 300ms linear forwards
  `};
  overflow: hidden;
  background: #010f27;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #2c3550;
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;
  color: white;
  @media screen and (min-width: 968px) {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  color: white;
`

const StakeContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: 576px) {
    justify-content: flex-start;
  }
`

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  @media screen and (min-width: 576px) {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;
    border-radius: 5px;

    svg {
      width: 14px;
    }
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 576px) {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  display: block;
  margin-top: auto;
  margin-bottom: auto;
  min-width: 200px;
`

const ValueContainer = styled.div`
  display: block;

  @media screen and (min-width: 968px) {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const ActionPanel = ({
  details,
  apr,
  multiplier,
  liquidity,
  userDataReady,
  expanded,
  hasDiscount,
}) => {
  const farm = details

  const { t } = useTranslation()
  const tokenOnly = farm.isTokenOnly
  const isActive = farm.multiplier !== '0X'
  const { quoteToken, token } = farm
  const lpLabel =
    farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANARB', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const lpAddress = farm.lpAddresses[CHAIN_ID]
  const scan = useMemo(
    () =>
      getScanAddressUrl(tokenOnly ? farm.token.address[CHAIN_ID] : lpAddress),
    [tokenOnly, lpAddress, farm.token.address]
  )
  const noFees = parseFloat(farm.depositFee) === 0
  const link = useMemo(
    () =>
      tokenOnly
        ? `${BASE_SWAP_URL}?outputCurrency=${getAddress(farm.token.address)}`
        : `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`,
    [tokenOnly, liquidityUrlPathParts, farm.token.address]
  )
  return (
    <Container expanded={expanded}>
      <InfoContainer>
        {isActive && (
          <StakeContainer>
            <StyledLinkExternal href={link}>
              {t('Get %symbol%', { symbol: lpLabel })}
            </StyledLinkExternal>
          </StakeContainer>
        )}
        <StyledLinkExternal href={scan}>
          {t('View Contract')}
        </StyledLinkExternal>
        <TagsContainer>
          {noFees && <NoFeesTag />}
          {farm.withDepositLockDiscount && <DepositLockDicountTag />}
        </TagsContainer>
      </InfoContainer>
      <ValueContainer>
        <ValueWrapper>
          <Text style={{ fontSize: '12px' }}>{t('APR')}</Text>
          <Apr {...apr} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{t('Multiplier')}</Text>
          <Multiplier {...multiplier} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{t('Liquidity')}</Text>
          <Liquidity {...liquidity} />
        </ValueWrapper>
      </ValueContainer>
      <ActionContainer>
        <HarvestAction {...farm} userDataReady={userDataReady} />
        <StakedAction
          {...farm}
          hasDiscount={hasDiscount}
          userDataReady={userDataReady}
        />
      </ActionContainer>
    </Container>
  )
}

export default ActionPanel
