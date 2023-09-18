import tokens from './tokens'

const farmsConfig = [
  {
    pid: 7,
    lpSymbol: tokens.wild.symbol,
    isTokenOnly: true,
    lpAddresses: '0x23dc96d1f4CAD9e21C825b7cd945F238768AE858', //'0x7c1f5FAC2Ed605Ba8818dEE87dC41c80674F9f68',
    token: tokens.wild,
    quoteToken: tokens.wild,
    logoA: '/images/tokens/wildx.svg',
    logoB: ''
  },
  {
    pid: 5,
    lpSymbol: tokens.weth.symbol,
    isTokenOnly: true,
    lpAddresses: '0x4200000000000000000000000000000000000006',
    token: tokens.weth,
    quoteToken: tokens.weth,
    logoA: '/images/tokens/weth.svg',
    logoB: ''
  },
  {
    pid: 6,
    lpSymbol: tokens.dai.symbol,
    isTokenOnly: true,
    lpAddresses: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
    token: tokens.dai,
    quoteToken: tokens.weth,
    logoA: '/images/tokens/dai.svg',
    logoB: ''
  },
  {
    pid: 8,
    lpSymbol: 'WETH-2WILD',
    lpAddresses: '0x6699F44A6dD2DF8ecEDb4C8688ef4ACd15CD24D7', //'0x248a94FE9526a10A2d6714ecdABcEC5932DeFB00',
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
