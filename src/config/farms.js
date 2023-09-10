import tokens from './tokens'

const farmsConfig = [
  {
    pid: 0,
    lpSymbol: tokens.wild.symbol,
    isTokenOnly: true,
    lpAddresses: '0x270891EdCC2d700EAFe717352469cfc750dEe899',
    token: tokens.wild,
    quoteToken: tokens.weth,
  },
  {
    pid: 1,
    lpSymbol: tokens.alb.symbol,
    isTokenOnly: true,
    lpAddresses: '0xeF24722d5daE32Dc155d961561cFFbc5f347EeE7',
    token: tokens.alb,
    quoteToken: tokens.weth,
  },
  {
    pid: 2,
    lpSymbol: tokens.weth.symbol,
    isTokenOnly: true,
    lpAddresses: '0xeF24722d5daE32Dc155d961561cFFbc5f347EeE7',
    token: tokens.weth,
    quoteToken: tokens.usdc,
  },
  {
    pid: 3,
    lpSymbol: 'WILD-WETH',
    lpAddresses: '0x6a589A8d83e0C528c8066878Fe2217A0E59d6123',
    token: tokens.wild,
    quoteToken: tokens.weth,
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
