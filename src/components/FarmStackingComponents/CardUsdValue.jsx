import React from 'react'
import CardValue from './CardValue'

const CardUsdValue = (props) => {
  return (
    <CardValue
      fontSize='14px'
      lineHeight='1.1'
      color='textSubtle'
      prefix='~$'
      decimals={2}
      {...props}
    />
  )
}

export default CardUsdValue
