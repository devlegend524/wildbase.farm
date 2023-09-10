// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
import { CHAIN_ID } from 'config/config'
import { getWethAddress } from './addressHelpers'

const getLiquidityUrlPathParts = ({ quoteTokenAddress, tokenAddress }) => {
  const wETHAddressString = getWethAddress()
  const quoteTokenAddressString = quoteTokenAddress ? quoteTokenAddress : null
  const tokenAddressString = tokenAddress ? tokenAddress : null
  const firstPart =
    !quoteTokenAddressString || quoteTokenAddressString === wETHAddressString ? 'ETH' : quoteTokenAddressString
  const secondPart = !tokenAddressString || tokenAddressString === wETHAddressString ? 'ETH' : tokenAddressString
  return `${firstPart}/${secondPart}`
}

export default getLiquidityUrlPathParts
