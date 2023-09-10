import React from 'react'
import styled from 'styled-components'
import { useFarmUser } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { Text } from 'uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import TokenPairImage, { getImageUrlFromToken } from 'components/TokenPairImage'
import { StyledPrimaryImage } from 'uikit/components/Image/styles'
import DepositFee from './DepositFee'

const Arrow = () => (
  <svg
    className='tokens-arrow'
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M12 8.5L8.5 5V12L12 8.5Z' fill='white' />
    <path d='M4 8.5H11' stroke='white' />
  </svg>
)

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  @media screen and (min-width: 370px) {
    padding-left: 32px;
  }
`

const TokensWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  color: #fff;
  margin-right: 10px;

  flex-direction: column;

  @media (max-width: 767px) {
    .tokens-arrow {
      transform: rotate(90deg);
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const TokenWrapper = styled.div`
  width: 30px;
  height: 24px;
  position: relative;

  @media screen and (min-width: 576px) {
    width: 60px;
    height: 40px;
  }
`

const Farm = ({
  isTokenOnly,
  token,
  quoteToken,
  label,
  pid,
  depositFee,
  hasDiscount,
}) => {
  const { stakedBalance } = useFarmUser(pid)
  const { t } = useTranslation()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderFarming = () => {
    if (rawStakedBalance) {
      return (
        <Text color='secondary' fontSize='12px' bold textTransform='uppercase'>
          {t('Farming')}
        </Text>
      )
    }

    return null
  }

  const imgSize = 40

  return (
    <Container>
      <TokensWrapper>
        <TokenWrapper>
          {isTokenOnly ? (
            <StyledPrimaryImage
              variant='inverted'
              src={getImageUrlFromToken(token)}
              width={imgSize}
              height={imgSize}
            />
          ) : (
            <TokenPairImage
              variant='inverted'
              primaryToken={token}
              secondaryToken={quoteToken}
              width={imgSize}
              height={imgSize}
            />
          )}
        </TokenWrapper>
        <Arrow />
        <TokenWrapper>
          <StyledPrimaryImage
            variant='inverted'
            src='/images/tokens/wild.svg'
            width={imgSize}
            height={imgSize}
          />
        </TokenWrapper>
      </TokensWrapper>
      <div>
        {handleRenderFarming()}
        <Text color='#ddd'>{label}</Text>
        <Text fontSize='12px' color='white'>
          Deposit fee:{' '}
          <DepositFee
            depositFee={depositFee}
            isTokenOnly={isTokenOnly}
            hasDiscount={hasDiscount}
          />
        </Text>
      </div>
    </Container>
  )
}

export default Farm
