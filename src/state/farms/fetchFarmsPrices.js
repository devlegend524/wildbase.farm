import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'

const getFarmFromTokenSymbol = (farms, tokenSymbol, preferredQuoteTokens) => {
  const farmsWithTokenSymbol = farms.filter((farm) => farm.token.symbol === tokenSymbol)
  const filteredFarm = filterFarmsByQuoteToken(farmsWithTokenSymbol, preferredQuoteTokens)
  return filteredFarm
}

const getFarmBaseTokenPrice = (farm, quoteTokenFarm, wethPriceUsdt) => {
  const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote)
  if (['USDC', 'USDT'].includes(farm.quoteToken.symbol)) {
    return hasTokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (farm.quoteToken.symbol === 'WETH') {
    return hasTokenPriceVsQuote ? wethPriceUsdt.times(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  // We can only calculate profits without a quoteTokenFarm for BUSD/BNB farms
  if (!quoteTokenFarm) {
    return BIG_ZERO
  }
  console.log("getFarmBaseTokenPrice")
  console.log(quoteTokenFarm)
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

const getFarmQuoteTokenPrice = (farm, quoteTokenFarm, wethPriceUsdt) => {
  // console.log("quoteTokenFarm.tokenPriceVsQuote", farm, quoteTokenFarm, wethPriceUsdt.toNumber());
  if (['USDC', 'USDT'].includes(farm.quoteToken.symbol)) {
    return BIG_ONE
  }

  if (farm.quoteToken.symbol === 'WETH') {
    return wethPriceUsdt
  }
  console.log("quoteTokenFarm")
  console.log(quoteTokenFarm)
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
  let wethPriceUsdt;
  try {
    const res = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
    const result = await res.json()
    wethPriceUsdt = new BigNumber(result?.USD)

  } catch (e) {
    wethPriceUsdt = BIG_ZERO
  }
  const farmsWithPrices = farms.map((farm) => {
    const quoteTokenFarm = getFarmFromTokenSymbol(farms, farm.quoteToken.symbol)
    const baseTokenPrice = getFarmBaseTokenPrice(farm, quoteTokenFarm, wethPriceUsdt)
    const quoteTokenPrice = getFarmQuoteTokenPrice(farm, quoteTokenFarm, wethPriceUsdt)

    const token = { ...farm.token, usdcPrice: baseTokenPrice.toJSON() }
    const quoteToken = { ...farm.quoteToken, usdcPrice: quoteTokenPrice.toJSON() }
    return { ...farm, token, quoteToken }
  })

  return farmsWithPrices
}

export default fetchFarmsPrices
