import styled from 'styled-components'
import { variant as StyledSystemVariant } from 'styled-system'
import { variants } from './types'
import TokenImage from './TokenImage'

export const StyledPrimaryImage = styled(TokenImage)`
  position: absolute;
  border: 2px solid #91abe1;
  border-radius: 50%;
  img {
    border-radius: 50%;
    background: #fff;
  }

  width: 100%;

  ${StyledSystemVariant({
    variants: {
      [variants.DEFAULT]: {
        bottom: 'auto',
        left: 0,
        right: 'auto',
        top: 0,
        zIndex: 5,
      },
      [variants.INVERTED]: {
        bottom: 0,
        left: 'auto',
        right: 0,
        top: 'auto',
        zIndex: 6,
      },
    },
  })}
`

export const StyledSecondaryImage = styled(TokenImage)`
  position: absolute;
  width: 100%;

  ${StyledSystemVariant({
    variants: {
      [variants.DEFAULT]: {
        bottom: 0,
        left: 'auto',
        right: 0,
        top: 'auto',
        zIndex: 6,
      },
      [variants.INVERTED]: {
        bottom: 'auto',
        left: 0,
        right: 'auto',
        top: 0,
        zIndex: 5,
      },
    },
  })}
`
