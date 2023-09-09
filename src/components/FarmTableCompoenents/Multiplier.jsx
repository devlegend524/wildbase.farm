import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Skeleton } from 'uikit'
import { useTranslation } from 'contexts/Localization'

const ReferenceElement = styled.div`
  display: inline-block;
`

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
        'The multiplier represents the amount of WILD rewards each farm gets.'
      )}
      <br />
      <br />
      {t(
        'For example, if a 1x farm was getting 1 WILD per block, a 40x farm would be getting 40 WILD per block.'
      )}
    </div>
  )

  return (
    <Container>
      <MultiplierWrapper>{displayMultiplier}</MultiplierWrapper>
      <HelpIcon color='textSubtle' />
    </Container>
  )
}

export default Multiplier
