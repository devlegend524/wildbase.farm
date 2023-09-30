import React from 'react'
import styled from 'styled-components'
import { Text, Button, Input, Flex, Link } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { BigNumber } from 'bignumber.js'

const getBoxShadow = ({ theme }) => {
  return theme.shadows.inset
}

const StyledTokenInput = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  box-shadow: ${getBoxShadow};
  padding: 20px;
  width: 100%;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  flex: 1;
  margin: 0 8px;
  padding: 0 8px;

  @media screen and (min-width: 370px) {
    width: 80px;
  }

  @media screen and (min-width: 576px) {
    width: auto;
  }
`

const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`

const ModalInput = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  addLiquidityUrl,
  inputTitle,
  decimals = 18,
}) => {
  const { t } = useTranslation()
  const isBalanceZero = max === '0' || !max

  const displayBalance = (balance) => {
    if (isBalanceZero) {
      return '0'
    }
    const balanceBigNumber = new BigNumber(balance)
    if (balanceBigNumber.gt(0) && balanceBigNumber.lt(0.0001)) {
      return balanceBigNumber.toLocaleString()
    }
    return balanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }

  return (
    <div style={{ position: 'relative' }}>
      <StyledTokenInput>
        <div className='flex items-center justify-between pl-[16px]'>
          <Text fontSize='14px'>{inputTitle}</Text>
          <Text fontSize='14px'>
            {t('Balance: %balance%', { balance: displayBalance(max) })}
          </Text>
        </div>
        <div className='flex items-center justify-acound'>
          <StyledInput
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode='decimal'
            step='any'
            min='0'
            onChange={onChange}
            placeholder='0'
            value={value}
          />
          <Button scale='sm' onClick={onSelectMax} mr='8px'>
            {t('Max')}
          </Button>
          <Text fontSize='16px'>{symbol}</Text>
        </div>
      </StyledTokenInput>
      {isBalanceZero && (
        <StyledErrorMessage fontSize='14px' color='failure'>
          {t('No tokens to stake')}:{' '}
          <Link fontSize='14px' href={addLiquidityUrl} external color='failure'>
            {t('Get %symbol%', { symbol })}
          </Link>
        </StyledErrorMessage>
      )}
    </div>
  )
}

export default ModalInput
