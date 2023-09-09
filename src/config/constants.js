export const contractAddresses = {
  masterChef: {
    8453: '0x7F7dA9450202a36f8fA109065D6b9A89d89bfc76',
    84531: '0x059217D0AC3a29577e3449E32225E9Dfa9755ec7',
  },
  wildNFT: {
    8453: '0x2Fc938867cB44E0d21e7c6B6E88Ddfa4f174e61e',
    84531: '0x01E21d7B8c39dc4C764c19b308Bd8b14B1ba139E',
  },
  presaleContract: {
    8453: '0x61091e38f99f3b244073bCec14456E83cF3aEcC5',
    84531: '0xEd44Bc1D2F56f7c37D3Fffe600264d021d324cA1',
  },
  multiCall: {
    8453: '0xC48cb0E0f5c9565d99062cAF2DC540313dD280b5',
    84531: '0xdEE8AebA03ab0345B2C8691976AadfCE41Fb624E',
  },
}

export const EXPLORER_URL = {
  8453: 'https://basescan.org/',
  84531: 'https://georli.basescan.org/'
}
export const getSortOptions = () => {
  return [
    {
      label: 'Hot',
      value: 'hot',
    },
    {
      label: 'APR',
      value: 'apr',
    },
    {
      label: 'Multiplier',
      value: 'multiplier',
    },
    {
      label: 'Earned',
      value: 'earned',
    },
    {
      label: 'Liquidity',
      value: 'liquidity',
    },
    {
      label: 'Deposit fee',
      value: 'depositFee',
    },
  ]
}

export const DesktopColumnSchema = [
  {
    id: 1,
    name: 'farm',
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'apr',
    sortable: true,
    label: 'APR',
  },
  {
    id: 3,
    name: 'liquidity',
    sortable: true,
    label: 'Liquidity',
  },
  {
    id: 4,
    name: 'earned',
    sortable: true,
    label: 'Earned',
  },
  {
    id: 5,
    name: 'multiplier',
    sortable: true,
    label: 'Multiplier',
  },
  {
    id: 6,
    name: 'details',
    sortable: true,
    label: '',
  },
]
export const MobileColumnSchema = [
  {
    id: 1,
    name: 'farm',
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'earned',
    sortable: true,
    label: 'Earned',
  },
  {
    id: 3,
    name: 'apr',
    sortable: true,
    label: 'APR',
  },
  {
    id: 6,
    name: 'details',
    sortable: true,
    label: '',
  },
]
