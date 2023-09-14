import React from 'react'
import CardValue from './CardValue'

const CardUsdValue = (props) => {
  return (
    <CardValue
      fontSize='18px'
      lineHeight='1.1'
      color='textWhite'
      prefix='~$ '
      decimals={2}
      {...props}
    />
  )
}

export default CardUsdValue
