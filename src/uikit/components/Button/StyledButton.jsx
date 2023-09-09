import styled from 'styled-components'
import { space, layout, variant } from 'styled-system'
import { scaleVariants, styleVariants } from './theme'

const getDisabledStyles = ({ $isLoading, theme }) => {
  if ($isLoading === true) {
    return `
      &:disabled,
      &.pancake-button--disabled {
        cursor: not-allowed;
      }
    `
  }

  return `
    &:disabled,
    &.pancake-button--disabled {
      background-color: #E9EAEB;
      border-color: #E9EAEB;
      box-shadow: none;
      color: #BDC2C4;
      cursor: not-allowed;
    }
  `
}

/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */

const getOpacity = ({ $isLoading = false }) => {
  return $isLoading ? '.5' : '1'
}

const StyledButton = styled.button`
  align-items: center;
  border: 0;
  border-radius: 2px;
  box-shadow: 0px -1px 0px 0px rgba(14, 14, 44, 0.4) inset;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  opacity: ${getOpacity};
  outline: 0;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover:not(:disabled):not(.pancake-button--disabled):not(
      .pancake-button--disabled
    ):not(:active) {
    opacity: 0.65;
  }

  &:active:not(:disabled):not(.pancake-button--disabled):not(
      .pancake-button--disabled
    ) {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }

  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  color: #ddd;
  background-color: #031531;

  ${getDisabledStyles}
  ${variant({
    prop: 'scale',
    variants: scaleVariants,
  })}
  ${variant({
    variants: styleVariants,
  })}
  ${layout}
  ${space}
  padding: 20px;
`

export default StyledButton
