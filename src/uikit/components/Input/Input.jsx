import styled from 'styled-components'
import { scales } from './types'

/**
 * Priority: Warning --> Success
 */
const getBoxShadow = ({ theme }) => {
  return theme.shadows.inset
}

const getHeight = ({ scale = scales.MD }) => {
  switch (scale) {
    case scales.SM:
      return '32px'
    case scales.LG:
      return '48px'
    case scales.MD:
    default:
      return '40px'
  }
}

const Input = styled.input`
  background-color: #eeeaf4;
  border: 0;
  border-radius: 2px;
  box-shadow: ${getBoxShadow};
  color: #280d5f;
  display: block;
  font-size: 16px;
  height: ${getHeight};
  outline: 0;
  padding: 0 16px;
  width: 100%;

  &::placeholder {
    color: #0d0d0d;
  }

  &:disabled {
    background-color: #e9eaeb;
    box-shadow: none;
    color: #bdc2c4;
    cursor: not-allowed;
  }

  &:focus:not(:disabled) {
    box-shadow: #666171;
  }
`

Input.defaultProps = {
  scale: scales.MD,
}

export default Input
