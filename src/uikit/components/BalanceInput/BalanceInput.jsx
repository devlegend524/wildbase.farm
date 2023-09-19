import React from 'react'
import Text from '../Text/Text'
import { StyledBalanceInput, StyledInput } from './styles'

const BalanceInput = ({
  value,
  placeholder = '0.0',
  onUserInput,
  currencyValue,
  inputProps,
  decimals = 18,
  ...props
}) => {
  const handleOnChange = (e) => {
    if (e.currentTarget.validity.valid) {
      onUserInput(e.currentTarget.value.replace(/,/g, '.'))
    }
  }

  return (
    <StyledBalanceInput {...props}>
      <StyledInput
        pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
        inputMode='decimal'
        min='0'
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        {...inputProps}
      />
      {currencyValue && (
        <Text fontSize='12px' color='white'>
          {currencyValue}
        </Text>
      )}
    </StyledBalanceInput>
  )
}

export default BalanceInput
