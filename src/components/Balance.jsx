import React, { useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import { Text } from 'uikit'

const Balance = ({
  value,
  color = 'text',
  decimals = 3,
  isDisabled = false,
  unit,
  prefix,
  onClick,
  ...props
}) => {
  const previousValue = useRef(0)

  useEffect(() => {
    previousValue.current = value
  }, [value])

  return (
    <Text
      color={isDisabled ? 'textDisabled' : color}
      onClick={onClick}
      {...props}
    >
      {prefix && <span>{prefix}</span>}
      <CountUp
        start={previousValue.current}
        end={value}
        decimals={decimals}
        duration={1}
        separator=','
      />
      {unit && <span>{unit}</span>}
    </Text>
  )
}

export default Balance
