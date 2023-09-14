import styled from 'styled-components'
import Box from '../Box/Box'
import Input from '../Input/Input'

export const StyledBalanceInput = styled(Box)`
  background-color: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 2px;
  box-shadow: 'warning';
  padding: 8px 16px;
`

export const StyledInput = styled(Input)`
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  padding-left: 0;
  padding-right: 0;
  text-align: right;

  ::placeholder {
    color: #0d0d0d;
  }

  &:focus:not(:disabled) {
    box-shadow: none;
  }
`
