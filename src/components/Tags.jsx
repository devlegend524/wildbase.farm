import React from 'react'
import {
  Tag,
  VerifiedIcon,
  BinanceIcon,
  RefreshIcon,
  AutoRenewIcon,
} from 'uikit'
import { useTranslation } from 'contexts/Localization'

const CoreTag = (props) => {
  const { t } = useTranslation()
  return (
    <Tag
      variant='secondary'
      outline='false'
      startIcon={<VerifiedIcon width='18px' color='secondary' mr='4px' />}
      {...props}
    >
      {t('Core')}
    </Tag>
  )
}

const NoFeesTag = (props) => {
  const { t } = useTranslation()
  return (
    <Tag
      variant='success'
      outline='false'
      startIcon={<VerifiedIcon width='18px' color='success' mr='4px' />}
      {...props}
    >
      {t('No Fees')}
    </Tag>
  )
}
const SingleStakeTag = (props) => {
  const { t } = useTranslation()
  return (
    <Tag
      variant='success'
      outline='false'
      startIcon={<VerifiedIcon width='18px' color='success' mr='4px' />}
      {...props}
    >
      {t('Single Stake')}
    </Tag>
  )
}
const BinanceTag = (props) => {
  return (
    <Tag
      variant='binance'
      outline='false'
      startIcon={<BinanceIcon width='18px' color='secondary' mr='4px' />}
      {...props}
    >
      Binance
    </Tag>
  )
}

const DualTag = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant='textSubtle' outline {...props}>
      {t('Dual')}
    </Tag>
  )
}

const ManualPoolTag = (props) => {
  const { t } = useTranslation()
  return (
    <Tag
      variant='secondary'
      outline='false'
      startIcon={<RefreshIcon width='18px' color='secondary' mr='4px' />}
      {...props}
    >
      {t('Manual')}
    </Tag>
  )
}

const CompoundingPoolTag = (props) => {
  const { t } = useTranslation()
  return (
    <Tag
      variant='success'
      outline='false'
      startIcon={<AutoRenewIcon width='18px' color='success' mr='4px' />}
      {...props}
    >
      {t('Auto')}
    </Tag>
  )
}

const DepositLockDicountTag = (props) => {
  const { t } = useTranslation()
  return (
    <Tag
      variant='success'
      outline='false'
      startIcon={<AutoRenewIcon width='18px' color='success' mr='4px' />}
      {...props}
    >
      {t('Deposit Lock Discount')}
    </Tag>
  )
}

export {
  CoreTag,
  NoFeesTag,
  SingleStakeTag,
  BinanceTag,
  DualTag,
  ManualPoolTag,
  CompoundingPoolTag,
  DepositLockDicountTag,
}
