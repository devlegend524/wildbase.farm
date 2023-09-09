import { scales, variants } from './types'

export const scaleVariants = {
  [scales.MD]: {
    height: '60px',
    padding: '0 30px',
  },
  [scales.MD]: {
    height: '48px',
    padding: '0 24px',
  },
  [scales.SM]: {
    height: '32px',
    padding: '0 16px',
  },
  [scales.XS]: {
    height: '20px',
    fontSize: '12px',
    padding: '0 8px',
  },
}

export const styleVariants = {
  [variants.PRIMARY]: {
    color: '#1B2131',
    background: 'linear-gradient(90deg, #D9ABE7 1.82%, #65BAF9 100%)',
  },
  [variants.SECONDARY]: {
    backgroundColor: 'transparent',
    border: '2px solid',
    borderColor: 'primary',
    boxShadow: 'none',
    color: 'primary',
    ':disabled': {
      backgroundColor: 'transparent',
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: 'tertiary',
    boxShadow: 'none',
    color: 'primary',
  },
  [variants.SUBTLE]: {
    backgroundColor: 'textSubtle',
    color: 'backgroundAlt',
  },
  [variants.DANGER]: {
    backgroundColor: 'failure',
    color: 'white',
  },
  [variants.SUCCESS]: {
    backgroundColor: 'success',
    color: 'white',
  },
  [variants.TEXT]: {
    backgroundColor: 'transparent',
    color: 'primary',
    boxShadow: 'none',
  },
  [variants.ACCOUNT]: {
    background: '#2A334C',
    borderRadius: '56px',
    color: '#9199B0',
  },
}
