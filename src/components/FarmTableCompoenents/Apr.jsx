/* eslint-disable react/no-unused-prop-types */

import React from 'react'
import styled from 'styled-components'
import ApyButton from './ApyButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config/config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Skeleton } from 'uikit'

const Container = styled.div`
  display: flex;
  align-items: center;

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: #0d0d0d;
      }
    }
  }
`

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
  color: white;
`

const Apr = ({
  value,
  lpLabel,
  tokenAddress,
  quoteTokenAddress,
  wildPrice,
  originalValue,
  hideButton = false,
}) => {
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress,
    tokenAddress,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  return originalValue !== 0 ? (
    <Container>
      {originalValue ? (
        <>
          <AprWrapper>{value}%</AprWrapper>
          {!hideButton && (
            <ApyButton
              lpLabel={lpLabel}
              wildPrice={wildPrice}
              apr={originalValue}
              addLiquidityUrl={addLiquidityUrl}
            />
          )}
        </>
      ) : (
        <AprWrapper>0%</AprWrapper>
      )}
    </Container>
  ) : (
    <Container>
      <AprWrapper>{originalValue}%</AprWrapper>
    </Container>
  )
}

export default Apr
