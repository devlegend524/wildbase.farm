import tokens from './tokens'

const farmsConfig = [
  {
    pid: 0,
    lpSymbol: tokens.wild.symbol,
    isTokenOnly: true,
    lpAddresses: '0xE2f12e32A5Ae550d8F322E053a8A35E49304AE52',
    token: tokens.wild,
    quoteToken: tokens.weth,
    logoA: '/images/tokens/wildx.svg',
    logoB: ''
  },
  {
    pid: 1,
    lpSymbol: tokens.weth.symbol,
    isTokenOnly: true,
    lpAddresses: '0xCbd7a2Db5F38fad25352c3279A8535EB7137dd39',
    token: tokens.weth,
    quoteToken: tokens.wild,
    logoA: '/images/tokens/weth.svg',
    logoB: ''
  },
  {
    pid: 2,
    lpSymbol: 'WETH-USDC',
    lpAddresses: '0xeF24722d5daE32Dc155d961561cFFbc5f347EeE7',
    token: tokens.usdc,
    quoteToken: tokens.weth,
    logoA: '/images/tokens/weth.svg',
    logoB: '/images/tokens/usdc.svg'
  },
  {
    pid: 3,
    lpSymbol: 'WETH-WILD',
    lpAddresses: '0x99F6f025ae923A97ABbe599900b282FADdF0b69D',
    token: tokens.wild,
    quoteToken: tokens.weth,
    logoA: '/images/tokens/wildx.svg',
    logoB: '/images/tokens/weth.svg'
  },
  // {
  //   pid: 2,
  //   lpSymbol: tokens.alb.symbol,
  //   isTokenOnly: true,
  //   lpAddresses: '0x1dd2d631c92b1aCdFCDd51A0F7145A50130050C4',
  //   token: tokens.alb,
  //   quoteToken: tokens.weth,
  //   logoA: '/images/tokens/alb.jpg',
  //   logoB: ''
  // },
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
  //   lpAddresses: '0xeF24722d5daE32Dc155d961561cFFbc5f347EeE7',
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
