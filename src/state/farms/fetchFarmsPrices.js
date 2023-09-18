import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'

const getFarmFromTokenSymbol = (farms, tokenSymbol, preferredQuoteTokens) => {
  const farmsWithTokenSymbol = farms.filter((farm) => farm.token.symbol === tokenSymbol)
  const filteredFarm = filterFarmsByQuoteToken(farmsWithTokenSymbol, preferredQuoteTokens)
  return filteredFarm
}

const getFarmBaseTokenPrice = (farm, quoteTokenFarm, wethPriceUsdt, wildxPriceUsdt) => {
  const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote)
  if (['USDC', 'USDT'].includes(farm.quoteToken.symbol)) {
    return hasTokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO
  }
  if (farm.quoteToken.symbol === 'WETH') {
    return hasTokenPriceVsQuote ? wethPriceUsdt.times(farm.tokenPriceVsQuote) : BIG_ZERO
  }
  if (farm.quoteToken.symbol === '2WILD') {
    return hasTokenPriceVsQuote ? wildxPriceUsdt.times(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  // We can only calculate profits without a quoteTokenFarm for BUSD/BNB farms
  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  // Possible alternative farm quoteTokens:
  // UST (i.e. MIR-UST), pBTC (i.e. PNT-pBTC), BTCB (i.e. bBADGER-BTCB), ETH (i.e. SUSHI-ETH)
  // If the farm's quote token isn't BUSD or wBNB, we then use the quote token, of the original farm's quote token
  // i.e. for farm PNT - pBTC we use the pBTC farm's quote token - BNB, (pBTC - BNB)
  // from the BNB - pBTC price, we can calculate the PNT - BUSD price
  if (quoteTokenFarm.quoteToken.symbol === 'WETH') {
    const quoteTokenInUsdc = wethPriceUsdt.times(quoteTokenFarm.tokenPriceVsQuote)
    return hasTokenPriceVsQuote && quoteTokenInUsdc
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInUsdc)
      : BIG_ZERO
  }

  if (['USDC', 'USDT'].includes(quoteTokenFarm.quoteToken.symbol)) {
    const quoteTokenInUsdc = quoteTokenFarm.tokenPriceVsQuote
    return hasTokenPriceVsQuote && quoteTokenInUsdc
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInUsdc)
      : BIG_ZERO
  }

  // Catch in case token does not have immediate or once-removed WMATIC/USDC quoteToken
  return BIG_ZERO
}

const getFarmQuoteTokenPrice = (farm, quoteTokenFarm, wethPriceUsdt, wildxPriceUsdt) => {
  if (['USDC', 'USDT'].includes(farm.quoteToken.symbol)) {
    return BIG_ONE
  }
  if (farm.quoteToken.symbol === '2WILD') {

    return wildxPriceUsdt
  }
  if (farm.quoteToken.symbol === 'WETH') {
    return wethPriceUsdt
  }
  console.log(farm.quoteToken.symbol)
  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'WETH') {
    return quoteTokenFarm.tokenPriceVsQuote ? wethPriceUsdt.times(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (['USDC', 'USDT'].includes(farm.quoteToken.symbol)) {
    return quoteTokenFarm.tokenPriceVsQuote ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  return BIG_ZERO
}

const fetchFarmsPrices = async (farms) => {
  const wethUsdtFarm = farms.find((farm) => farm.pid === 3)
  const wethPriceUsdt = wethUsdtFarm.tokenPriceVsQuote > 0 ? BIG_ONE.div(wethUsdtFarm.tokenPriceVsQuote) : BIG_ZERO
  const wildxUsdtFarm = farms.find((farm) => farm.pid === 2)
  const wildxPriceUsdt = wildxUsdtFarm.tokenPriceVsQuote > 0 ? new BigNumber(wildxUsdtFarm.tokenPriceVsQuote).times(wethPriceUsdt) : BIG_ZERO
  const farmsWithPrices = farms.map((farm) => {
    const quoteTokenFarm = getFarmFromTokenSymbol(farms, farm.quoteToken.symbol)
    const baseTokenPrice = getFarmBaseTokenPrice(farm, quoteTokenFarm, wethPriceUsdt, wildxPriceUsdt)
    const quoteTokenPrice = getFarmQuoteTokenPrice(farm, quoteTokenFarm, wethPriceUsdt, wildxPriceUsdt)

    const token = { ...farm.token, usdcPrice: baseTokenPrice.toJSON() }
    const quoteToken = { ...farm.quoteToken, usdcPrice: quoteTokenPrice.toJSON() }
    return { ...farm, token, quoteToken }
  })

  return farmsWithPrices
}

export default fetchFarmsPrices
