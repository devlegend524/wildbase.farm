import React from 'react'
import styled from 'styled-components'

const DepositFeeWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
`

const DepositFeeDiscounted = styled.div`
  text-decoration: line-through;
`

const DepositFee = ({ depositFee, isTokenOnly, hasDiscount }) => {
  // if (isTokenOnly) return '0%'
  const value = `${depositFee}%`
  return value
}

export default DepositFee
