export const contractAddresses = {
  masterChef: '0x3eAB0C9716b0aA98CdC4c3ae317d69dE301ef247', //'0x41492B0e514Be20d3a78f1b50f8f2E657591FD42',
  multiCall: '0xC48cb0E0f5c9565d99062cAF2DC540313dD280b5', //'0xC48cb0E0f5c9565d99062cAF2DC540313dD280b5',
  zap: '0x88E88B96D549e0497C6003D5ebF8e013Df806eBf', //'0xB6eE97116e48Fa293C327E627268e25EBFDABF3D',
  oracle: '0xB0d0BbF3391C69D9aD23c4bAb4785D47Fe721bCc',
  router: '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
  factory: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
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
