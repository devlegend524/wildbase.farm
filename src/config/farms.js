import tokens from './tokens'

const farmsConfig = [
  {
    pid: 0,
    lpSymbol: tokens.wild.symbol,
    isTokenOnly: true,
    lpAddresses: {
      8453: '0x270891EdCC2d700EAFe717352469cfc750dEe899',
      84531: '0x99F6f025ae923A97ABbe599900b282FADdF0b69D',
    },
    token: tokens.wild,
    quoteToken: tokens.weth,
  },
  {
    pid: 1,
    lpSymbol: tokens.usdc.symbol,
    isTokenOnly: true,
    lpAddresses: {
      8453: '0xeF24722d5daE32Dc155d961561cFFbc5f347EeE7',
      84531: '0x9Abb53F7549d3fa8FBF87EED068c3E2b95Ec8329',
    },
    token: tokens.usdc,
    quoteToken: tokens.weth,
  },
  {
    pid: 2,
    lpSymbol: tokens.weth.symbol,
    isTokenOnly: true,
    lpAddresses: {
      8453: '0xeF24722d5daE32Dc155d961561cFFbc5f347EeE7',
      84531: '0x9Abb53F7549d3fa8FBF87EED068c3E2b95Ec8329',
    },
    token: tokens.weth,
    quoteToken: tokens.usdc,
  },
  {
    pid: 3,
    lpSymbol: 'WETH-WILD',
    lpAddresses: {
      8453: '0x270891EdCC2d700EAFe717352469cfc750dEe899',
      84531: '0x99F6f025ae923A97ABbe599900b282FADdF0b69D',
    },
    token: tokens.wild,
    quoteToken: tokens.weth,
  },
  {
    pid: 4,
    lpSymbol: 'WETH-USDC',
    lpAddresses: {
      8453: '0xeF24722d5daE32Dc155d961561cFFbc5f347EeE7',
      84531: '0x9Abb53F7549d3fa8FBF87EED068c3E2b95Ec8329',
    },
    token: tokens.usdc,
    quoteToken: tokens.weth,
  },
]

export default farmsConfig
