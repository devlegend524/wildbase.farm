import React from 'react'
import styled from 'styled-components'

const DepositFee = ({ depositFee }) => {
  // if (isTokenOnly) return '0%'
  const value = `${depositFee ? depositFee : 0}%`
  return value
}

export default DepositFee
