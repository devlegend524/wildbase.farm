import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, Skeleton } from 'uikit'
import BigNumber from 'bignumber.js'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'


const DepositModal = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  addLiquidityUrl,
  decimals = 18,
  depositFee,
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


  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

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
      <ModalActions>
        <Button
          variant='secondary'
          onClick={onDismiss}
          width='100%'
          disabled={pendingTx}
          style={{ alignSelf: 'center', color: 'white' }}
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
          style={{ alignSelf: 'center', color: 'white' }}
        >
          {pendingTx ? t('Pending Confirmation') : t('Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default DepositModal
