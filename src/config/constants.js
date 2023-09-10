export const contractAddresses = {
  masterChef: '0x58f5F2AD3cfC3690B026170c7E3BE0582BE5148A',
  wildNFT: '0x2Fc938867cB44E0d21e7c6B6E88Ddfa4f174e61e',
  presaleContract: '0x61091e38f99f3b244073bCec14456E83cF3aEcC5',
  multiCall: '0xC48cb0E0f5c9565d99062cAF2DC540313dD280b5'
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
