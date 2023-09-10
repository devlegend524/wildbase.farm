import tokens from './tokens'

const farmsConfig = [
  {
    pid: 0,
    lpSymbol: tokens.wild.symbol,
    isTokenOnly: true,
    lpAddresses: '0x32D758d16Eef72fF7447b9Dd94304A2b222cd77f',
    token: tokens.wild,
    quoteToken: tokens.weth,
    logoA: '/images/tokens/wild.svg',
    logoB: ''
  },
  {
    pid: 1,
    lpSymbol: tokens.alb.symbol,
    isTokenOnly: true,
    lpAddresses: '0x1dd2d631c92b1aCdFCDd51A0F7145A50130050C4',
    token: tokens.alb,
    quoteToken: tokens.weth,
    logoA: '/images/tokens/alb.jpg',
    logoB: ''
  },
  {
    pid: 2,
    lpSymbol: tokens.weth.symbol,
    isTokenOnly: true,
    lpAddresses: '0x4200000000000000000000000000000000000006',
    token: tokens.weth,
    quoteToken: tokens.usdc,
    logoA: '/images/tokens/weth.svg',
    logoB: ''
  },
  {
    pid: 3,
    lpSymbol: 'WILD-WETH',
    lpAddresses: '0xf577e6A3FF6EDF48D8b2a7ed03669016b4F1EbbF',
    token: tokens.wild,
    quoteToken: tokens.weth,
    logoA: '/images/tokens/wild.svg',
    logoB: '/images/tokens/weth.svg'
  },
  // {
  //   pid: 4,
  //   lpSymbol: 'WILD-USDC',
  //   lpAddresses: '0xeF24722d5daE32Dc155d961561cFFbc5f347EeE7',
  //   token: tokens.wild,
  //   quoteToken: tokens.usdc,
  // },
  // {
  //   pid: 5,
  //   lpSymbol: 'WILD-DAI',
  //   lpAddresses: '0xd79Ef386f26E40B5e60e4aeB324F2678F6eBbF49',
  //   token: tokens.wild,
  //   quoteToken: tokens.dai,
  // },
  // {
  //   pid: 6,
  //   lpSymbol: 'WILD-MIM',
  //   lpAddresses: '0xd79Ef386f26E40B5e60e4aeB324F2678F6eBbF49',
  //   token: tokens.wild,
  //   quoteToken: tokens.mim,
  // },
  // {
  //   pid: 7,
  //   lpSymbol: 'WILD-SUSHI',
  //   lpAddresses: {
  //     8453: '0xd79Ef386f26E40B5e60e4aeB324F2678F6eBbF49',
  //     84531: '0x9Abb53F7549d3fa8FBF87EED068c3E2b95Ec8329',
  //   },
  //   token: tokens.wild,
  //   quoteToken: tokens.weth,
  // },
  // {
  //   pid: 8,
  //   lpSymbol: 'WILD-UNI',
  //   lpAddresses: {
  //     8453: '0xd79Ef386f26E40B5e60e4aeB324F2678F6eBbF49',
  //     84531: '0x9Abb53F7549d3fa8FBF87EED068c3E2b95Ec8329',
  //   },
  //   token: tokens.wild,
  //   quoteToken: tokens.weth,
  // },

]

export default farmsConfig
