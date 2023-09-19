import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Skeleton } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { Tooltip } from 'react-tooltip'

const MultiplierWrapper = styled.div`
  color: #0052ff;
  width: 36px;
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

const Multiplier = ({ multiplier }) => {
  const displayMultiplier = multiplier ? (
    multiplier.toLowerCase()
  ) : (
    <Skeleton width={30} />
  )
  const { t } = useTranslation()
  const tooltipContent = (
    <div>
      {t(
        'The multiplier represents the amount of WILDX rewards each farm gets.'
      )}
      <br />
      <br />
      {t(
        'For example, if a 1x farm was getting 1 WILDX per block, a 40x farm would be getting 40 WILDX per block.'
      )}
    </div>
  )

  return (
    <Container>
      <MultiplierWrapper>{displayMultiplier}</MultiplierWrapper>
      <HelpIcon
        data-tooltip-id='liquidity-tooltip'
        data-tooltip-content='The Multiplier represents the 
        proportion of 2WILD rewards each farm receives'
      />
      <Tooltip id='liquidity-tooltip' />
    </Container>
  )
}

export default Multiplier
