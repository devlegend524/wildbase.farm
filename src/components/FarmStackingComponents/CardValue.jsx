import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'
import { Text } from 'uikit'

const CardValue = ({
  value,
  decimals,
  fontSize = '40px',
  lineHeight = '1',
  prefix = '',
  bold = true,
  color = 'text',
}) => {
  let _decimals = decimals
  if (typeof decimals === 'undefined') {
    if (value < 0) {
      _decimals = 4
    } else {
      _decimals = value > 1e3 ? 0 : 3
    }
  }
  const countUpRef = React.useRef(null)

  const { update } = useCountUp({
    ref: countUpRef,
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals: _decimals,
  })

  useEffect(() => {
    update(value)
  }, [value])

  return (
    <Text
      ref={countUpRef}
      bold={bold}
      fontSize={fontSize}
      style={{ lineHeight }}
      color={color}
    />
  )
}

export default CardValue
