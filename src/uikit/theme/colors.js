
export const baseColors = {
  failure: '#FF0000',
  primary: '#FFF',
  primaryBright: '#53DEE9',
  primaryDark: '#0098A1',
  secondary: '#65BAF9',
  success: '#31D0AA',
  warning: '#FFB237',
}

export const additionalColors = {
  binance: '#F0B90B',
  overlay: 'rgba(0,0,0,.95)',
}

export const lightColors = {
  ...baseColors,
  ...additionalColors,
  background: '#FAF9FA',
  backgroundDisabled: '#E9EAEB',
  backgroundAlt: '#FFFFFF',
  cardBorder: '#E7E3EB',
  contrast: '#191326',
  dropdown: '#F6F6F6',
  dropdownDeep: '#EEEEEE',
  invertedContrast: '#FFFFFF',
  input: '#eeeaf4',
  inputSecondary: '#d7caec',
  tertiary: '#EFF4F5',
  text: '#280D5F',
  textDisabled: '#BDC2C4',
  textSubtle: '#0d0d0d',
  disabled: '#E9EAEB',
  toggle: '#d4d4d4',

  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #F3EFFF 0%, #F3EFFF 100%)',
    inverseBubblegum: 'linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)',
    cardHeader: 'linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)',
    blue: 'linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)',
    violet: 'linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)',
    violetAlt: 'linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)',
    gold: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)',
  },
}

export const darkColors = {
  ...baseColors,
  ...additionalColors,
  secondary: '#FFF',
  background: '#ffffff',
  backgroundDisabled: '#97a3c8',
  backgroundAlt: '#1B2131',
  cardBorder: 'transparent',
  contrast: '#FFFFFF',
  dropdown: '#1E1D20',
  dropdownDeep: '#100C18',
  invertedContrast: '#191326',
  input: 'transparent',
  inputSecondary: '#262130',
  primaryDark: '#0098A1',
  tertiary: '#353547',
  text: 'black',
  textDisabled: '#666171',
  textSubtle: '#0d2444',
  textWhite: 'white',
  disabled: '#524B63',
  toggle: '#d4d4d4',

  gradients: {
    bubblegum: 'linear-gradient(90deg, #D9ABE7 1.82%, #65BAF9 100%)',
    inverseBubblegum: 'linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)',
    cardHeader: 'linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)',
    blue: 'linear-gradient(180deg, #00707F 0%, #19778C 100%)',
    violet: 'linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)',
    violetAlt: 'linear-gradient(180deg, #434575 0%, #66578D 100%)',
    gold: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)',
  },
}
