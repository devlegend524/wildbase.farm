import tokens from './tokens'

const farmsConfig = [
  {
    pid: 0,
    lpSymbol: tokens.wild.symbol,
    isTokenOnly: true,
    lpAddresses: '0xC0AAc89F5DB081FA5F392B1b5b1a3dE0596B5E88',
    token: tokens.wild,
    quoteToken: tokens.wild,
    logoA: '/images/tokens/wildx.svg',
    logoB: ''
  },
  {
    pid: 1,
    lpSymbol: tokens.weth.symbol,
    isTokenOnly: true,
    lpAddresses: '0x4200000000000000000000000000000000000006',
    token: tokens.weth,
    quoteToken: tokens.weth,
    logoA: '/images/tokens/weth.svg',
    logoB: ''
  },
  {
    pid: 2,
    lpSymbol: 'WETH-WILDX',
    lpAddresses: '0x0c15EE801963c05db5cd1c41120EBfdC1F2e7338',
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
  //   lpAddresses: '0xf802c112E9443E8A7Cbb9289f0735266bD67238c',
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
