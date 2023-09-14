import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Text, Skeleton } from 'uikit'
import { useTranslation } from 'contexts/Localization'

const ReferenceElement = styled.div`
  display: inline-block;
`

const LiquidityWrapper = styled.div`
  min-width: 110px;
  font-weight: 600;
  text-align: right;
  margin-right: 14px;

  @media screen and (min-width: 968px) {
    text-align: left;
    margin-right: 0;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Liquidity = ({ liquidity }) => {
  const displayLiquidity =
    liquidity && liquidity.gt(0)
      ? `$${Number(liquidity).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}`
      : `$${Number(0).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}`
  const { t } = useTranslation()
  // const { targetRef, tooltip, tooltipVisible } = useTooltip(
  //   t('Total value of the funds in this farm’s liquidity pool'),
  //   { placement: 'top-end', tooltipOffset: [20, 10] }
  // )

  return (
    <Container>
      <LiquidityWrapper>
        <Text color='#0052FF'>{displayLiquidity}</Text>
      </LiquidityWrapper>
      <HelpIcon />
      {/* {tooltipVisible && tooltip} */}
    </Container>
  )
}

export default Liquidity
