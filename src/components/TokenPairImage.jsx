import React from 'react'

import { TokenPairImage as UIKitTokenPairImage } from 'uikit'

export const getImageUrlFromToken = (token) => {
  const symbol = token.symbol.toLowerCase()
  return `/images/tokens/${symbol}.svg`
}

const TokenPairImage = ({ primaryToken, secondaryToken, ...props }) => {
  return (
    <UIKitTokenPairImage
      primarySrc={getImageUrlFromToken(primaryToken)}
      secondarySrc={getImageUrlFromToken(secondaryToken)}
      {...props}
    />
  )
}

export default TokenPairImage
