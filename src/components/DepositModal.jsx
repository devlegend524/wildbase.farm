import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button, Modal, LinkExternal, Radio, Skeleton } from 'uikit'
import moment from 'moment'
import BigNumber from 'bignumber.js'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useMasterchef } from 'hooks/useContract'
import { BIG_TEN } from 'utils/bigNumber'

const DepositDiscountInfo = styled.div`
  color: black;
  margin-top: 20px;
`

const DepositDiscountTitle = styled.div`
  margin-bottom: 10px;
`

const DepositDiscountItems = styled.div``

const DepositDiscountItem = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  color: black;
  margin-top: 10px;
  margin-bottom: 10px;
`

const DepositDiscountLabel = styled.div`
  display: flex;
  align-items: center;

  span {
    text-decoration: line-through;
    margin-right: 2px;
  }
`

const lockPeriods = [
  {
    value: 0,
    discount: 0,
  },
  {
    value: 30,
    discount: 0.15,
  },
  {
    value: 60,
    discount: 0.3,
  },
  {
    value: 90,
    discount: 0.45,
  },
]

const DATE_FORMAT = 'MMMM Do YYYY, hh:mm:ss'

const useNewUnlockTime = ({
  pid,
  account,
  amount,
  lockPeriod,
  decimals,
  enabled,
}) => {
  const masterChef = useMasterchef()
  const [loading, setLoading] = useState(false)
  const [newUnlockTime, setNewUnlockTime] = useState(0)

  useEffect(() => {
    const fetchNewUnlockTime = async () => {
      try {
        setLoading(true)

        const amountWei = new BigNumber(amount || '0')
          .times(BIG_TEN.pow(decimals))
          .toString()

        const response = await masterChef.calculateNewUnlockTimeForUser(
          account,
          pid,
          lockPeriod * 60 * 60 * 24,
          amountWei
        )
        await response.wait()
        setNewUnlockTime(Date.now() + response * 1000)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    if (enabled) fetchNewUnlockTime()
  }, [account, pid, amount, decimals, lockPeriod, masterChef, enabled])

  return {
    loading,
    data: newUnlockTime,
  }
}

const UnlockTime = styled.div`
  margin-top: 20px;
`

const NewUnlockTime = ({
  pid,
  account,
  amount,
  decimals,
  lockPeriod,
  withDepositLockDiscount,
}) => {
  const { loading, data } = useNewUnlockTime({
    pid,
    account,
    amount,
    decimals,
    lockPeriod,
    enabled: withDepositLockDiscount,
  })

  if (loading) {
    return (
      <UnlockTime>
        New unlock time: <Skeleton width='130' />
      </UnlockTime>
    )
  }

  return (
    <UnlockTime>
      New unlock time: {data > 0 ? moment(data, 'x').format(DATE_FORMAT) : '-'}
    </UnlockTime>
  )
}

const DepositModal = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  addLiquidityUrl,
  decimals = 18,
  withDepositLockDiscount,
  depositFee,
  unlockTime,
  account,
  pid,
}) => {
  const [val, setVal] = useState('')
  const [lockPeriod, setLockPeriod] = useState(0)
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const valNumber = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const handleChange = useCallback(
    (e) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal]
  )

  const handleLockPeriodChange = (evt) => {
    const { value } = evt.target
    setLockPeriod(parseInt(value))
  }

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const depositFeeNumber = parseFloat(depositFee)

  return (
    <Modal title={t('Stake tokens')} onDismiss={onDismiss}>
      <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        addLiquidityUrl={addLiquidityUrl}
        inputTitle={t('Stake')}
        decimals={decimals}
      />
      {withDepositLockDiscount ? (
        <DepositDiscountInfo>
          <DepositDiscountTitle>
            Lock your tokens and get a discount on deposit fee:
          </DepositDiscountTitle>
          <DepositDiscountItems>
            {lockPeriods.map((item) => (
              <DepositDiscountItem key={item.value}>
                <Radio
                  scale='sm'
                  onChange={handleLockPeriodChange}
                  value={item.value}
                  checked={lockPeriod === item.value}
                />
                <DepositDiscountLabel>
                  {item.value}d -
                  {item.value > 0 ? <span> {depositFee}%</span> : null}{' '}
                  {depositFeeNumber * (1 - item.discount)}%
                </DepositDiscountLabel>
              </DepositDiscountItem>
            ))}
          </DepositDiscountItems>
          <UnlockTime>
            Old unlock time:{' '}
            {unlockTime > Date.now()
              ? moment(unlockTime, 'x').format(DATE_FORMAT)
              : 'Unlocked'}
          </UnlockTime>
          <NewUnlockTime
            decimals={decimals}
            account={account}
            pid={pid}
            amount={val}
            withDepositLockDiscount={withDepositLockDiscount}
            lockPeriod={lockPeriod}
          />
        </DepositDiscountInfo>
      ) : null}
      <ModalActions>
        <Button
          variant='secondary'
          onClick={onDismiss}
          width='100%'
          disabled={pendingTx}
        >
          {t('Cancel')}
        </Button>
        <Button
          width='100%'
          disabled={
            pendingTx ||
            !valNumber.isFinite() ||
            valNumber.eq(0) ||
            valNumber.gt(fullBalanceNumber)
          }
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val, lockPeriod)
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? t('Pending Confirmation') : t('Confirm')}
        </Button>
      </ModalActions>
      <LinkExternal href={addLiquidityUrl} style={{ alignSelf: 'center' }}>
        {t('Get %symbol%', { symbol: tokenName })}
      </LinkExternal>
    </Modal>
  )
}

export default DepositModal
