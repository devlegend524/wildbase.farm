import React from 'react'
import { variants } from './types'
import { StyledPrimaryImage, StyledSecondaryImage } from './styles'
import Wrapper from './Wrapper'

const TokenPairImage = ({
  primarySrc,
  secondarySrc,
  width,
  height,
  variant = variants.DEFAULT,
  primaryImageProps = {},
  secondaryImageProps = {},
  ...props
}) => {
  const cWidth = width + width / 2
  return (
    <Wrapper position='relative' width={cWidth} height={height} {...props}>
      <StyledPrimaryImage
        variant={variant}
        src={primarySrc}
        width={width}
        height={height}
        {...primaryImageProps}
      />
      <StyledSecondaryImage
        variant={variant}
        src={secondarySrc}
        width={width}
        height={height}
        {...secondaryImageProps}
      />
    </Wrapper>
  )
}

export default TokenPairImage
