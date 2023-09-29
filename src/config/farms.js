import tokens from './tokens'

const farmsConfig = [
  {
    pid: 1,
    lpSymbol: tokens.wild.symbol,
    isTokenOnly: true,
    lpAddresses: '0xF8Feb28ee87A9A6B6aA7eBaf1787F18E33889799',
    token: tokens.wild,
    quoteToken: tokens.wild,
    logoA: '/images/tokens/wildx.svg',
    logoB: ''
  },
  {
    pid: 2,
    lpSymbol: tokens.weth.symbol,
    isTokenOnly: true,
    lpAddresses: '0x4200000000000000000000000000000000000006',
    token: tokens.weth,
    quoteToken: tokens.weth,
    logoA: '/images/tokens/weth.svg',
    logoB: ''
  },
  {
    pid: 0,
    lpSymbol: 'WETH-WILDX',
    lpAddresses: '0x2A234919D1beC99876c93D7Bd09522841A3A6bb3',
    token: tokens.wild,
    quoteToken: tokens.weth,
    logoA: '/images/tokens/wildx.svg',
    logoB: '/images/tokens/weth.svg'
  },
  {
    pid: 3,
    lpSymbol: 'WETH-USDC',
    lpAddresses: '0xeF24722d5daE32Dc155d961561cFFbc5f347EeE7',
    token: tokens.usdc,
    quoteToken: tokens.weth,
    logoA: '/images/tokens/weth.svg',
    logoB: '/images/tokens/usdc.svg'
  },

  // {
  //   pid: 3,
  //   lpSymbol: 'WILDX-WETH',
  //   lpAddresses: '0xf577e6A3FF6EDF48D8b2a7ed03669016b4F1EbbF',
  //   token: tokens.wild,
  //   quoteToken: tokens.weth,
  //   logoA: '/images/tokens/wildx.svg',
  //   logoB: '/images/tokens/weth.svg'
  // },
  // {
  //   pid: 4,
  //   lpSymbol: 'WILDX-USDC',
  //   lpAddresses: '0x570cd8A4D9aF89D073c833E8864F06d55309dC70',
  //   token: tokens.wild,
  //   quoteToken: tokens.usdc,
  // },
  // {
  //   pid: 5,
  //   lpSymbol: 'WILDX-DAI',
  //   lpAddresses: '0xd79Ef386f26E40B5e60e4aeB324F2678F6eBbF49',
  //   token: tokens.wild,
  //   quoteToken: tokens.dai,
  // },
  // {
  //   pid: 6,
  //   lpSymbol: 'WILDX-MIM',
  //   lpAddresses: '0xd79Ef386f26E40B5e60e4aeB324F2678F6eBbF49',
  //   token: tokens.wild,
  //   quoteToken: tokens.mim,
  // },
  // {
  //   pid: 7,
  //   lpSymbol: 'WILDX-SUSHI',
  //   lpAddresses: {
  //     8453: '0xd79Ef386f26E40B5e60e4aeB324F2678F6eBbF49',
  //     84531: '0x9Abb53F7549d3fa8FBF87EED068c3E2b95Ec8329',
  //   },
  //   token: tokens.wild,
  //   quoteToken: tokens.weth,
  // },
  // {
  //   pid: 8,
  //   lpSymbol: 'WILDX-UNI',
  //   lpAddresses: {
  //     8453: '0xd79Ef386f26E40B5e60e4aeB324F2678F6eBbF49',
  //     84531: '0x9Abb53F7549d3fa8FBF87EED068c3E2b95Ec8329',
  //   },
  //   token: tokens.wild,
  //   quoteToken: tokens.weth,
  // },

]

export default farmsConfig
