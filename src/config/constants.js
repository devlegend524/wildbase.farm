export const contractAddresses = {
  masterChef: '0x1d22Ca2E4474e7fb6834faF5b21Fd4B19ca823c9', //'0x41492B0e514Be20d3a78f1b50f8f2E657591FD42',
  multiCall: '0xC48cb0E0f5c9565d99062cAF2DC540313dD280b5', //'0xC48cb0E0f5c9565d99062cAF2DC540313dD280b5',
  zap: '0xC53376D63C13FF7354a4eb2e8b3E212c8240A023',
  oracle: '0xB0d0BbF3391C69D9aD23c4bAb4785D47Fe721bCc',
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
