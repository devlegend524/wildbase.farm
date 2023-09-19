import React, { useMemo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { LinkExternal, Text } from 'uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getScanAddressUrl } from 'utils/getExplorerURL'
import {
  DepositLockDicountTag,
  NoFeesTag,
  SingleStakeTag,
} from 'components/Tags'
import { BASE_ADD_LIQUIDITY_URL, BASE_SWAP_URL, CHAIN_ID } from 'config/config'

import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import Apr from '../Apr'
import Multiplier from '../Multiplier'
import Liquidity from '../Liquidity'

const Container = styled.div`
  animation: ${css` 300ms linear forwards
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
  @media screen and (max-width: 576px) {
    flex-direction: column;
    margin-top: 0;
    gap: 0.5rem;
  }
  > div {
    height: 24px;
    padding: 2px 6px;
    font-size: 14px;
    margin-right: 4px;
    border-radius: 5px;

    svg {
      width: 14px;
    }
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
  const lpAddress = farm.lpAddresses
  const scan = useMemo(
    () => getScanAddressUrl(tokenOnly ? farm.token.address : lpAddress),
    [tokenOnly, lpAddress, farm.token.address]
  )
  const noFees = parseFloat(farm.depositFee) === 0
  const link = useMemo(
    () =>
      tokenOnly
        ? `${BASE_SWAP_URL}?outputCurrency=${farm.token.address}`
        : `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`,
    [tokenOnly, liquidityUrlPathParts, farm.token.address]
  )
  return (
    <div className='flex flex-col md:flex-row justify-between p-2 lg:p-3 max-w-screen w-full'>
      <div className='flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center w-full  lg:w-1/4'>
        <div>
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
        </div>
        <TagsContainer>
          {noFees && <NoFeesTag />}
          {farm.withDepositLockDiscount && <DepositLockDicountTag />}
          {tokenOnly && <SingleStakeTag />}
        </TagsContainer>
      </div>
      <div className='flex flex-col justify-between md:hidden w-full'>
        <ValueWrapper>
          <Text color='textWhite'>{t('APR')}</Text>
          <Apr {...apr} />
        </ValueWrapper>
        <ValueWrapper>
          <Text color='textWhite'>{t('Multiplier')}</Text>
          <Multiplier {...multiplier} />
        </ValueWrapper>
        <ValueWrapper>
          <Text color='textWhite'>{t('Liquidity')}</Text>
          <Liquidity {...liquidity} />
        </ValueWrapper>
      </div>
      <div className='flex flex-col md:flex-row w-full lg:w-3/4'>
        <HarvestAction {...farm} userDataReady={userDataReady} />
        <StakedAction {...farm} userDataReady={userDataReady} />
      </div>
    </div>
  )
}

export default ActionPanel
