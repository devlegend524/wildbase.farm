import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Countdown from 'react-countdown'
import styled from 'styled-components'
import { Button, Modal, Text } from 'uikit'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'

const CountdownNumber = styled.span`
  font-size: 30px;
  font-weight: bold;
`

const CountdownWrapper = styled.div`
  color: #fff;
  margin-top: 20px;
  margin-bottom: 20px;
`

const UnlockedText = () => <Text fontSize='30px'>Unlocked</Text>

const UnlockCountdown = ({ unlockTime }) => {
  const renderer = (args) => {
    const { completed, formatted } = args
    const { days, hours, minutes, seconds } = formatted
    if (completed) {
      // Render a completed state
      return <UnlockedText />
    }
    // Render a countdown
    return (
      <div>
        <div>
          <CountdownNumber>{days}</CountdownNumber> days{' '}
          <CountdownNumber>{hours}</CountdownNumber> hours{' '}
          <CountdownNumber>{minutes}</CountdownNumber> minutes{' '}
          <CountdownNumber>{seconds}</CountdownNumber> seconds
        </div>
      </div>
    )
  }

  return (
    <CountdownWrapper>
      <Text mb='10px'>Unlocks in:</Text>
      {unlockTime > 0 ? (
        <Countdown date={unlockTime} renderer={renderer} />
      ) : (
        <UnlockedText />
      )}
    </CountdownWrapper>
  )
}

const WithdrawModal = ({
  onConfirm,
  onDismiss,
  max,
  tokenName = '',
  unlockTime,
}) => {
  const [val, setVal] = useState('')
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

  const canWithdraw = unlockTime < Date.now()

  const submitDisabled =
    pendingTx ||
    !valNumber.isFinite() ||
    valNumber.eq(0) ||
    valNumber.gt(fullBalanceNumber) ||
    !canWithdraw

  return (
    <Modal title={t('Unstake tokens')} onDismiss={onDismiss}>
      <ModalInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
        inputTitle={t('Unstake')}
      />

      <UnlockCountdown unlockTime={unlockTime} />

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
          disabled={submitDisabled}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
          width='100%'
        >
          {pendingTx ? t('Pending Confirmation') : t('Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default WithdrawModal
