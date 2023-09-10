import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import {
  Button,
  useModal,
  IconButton,
  AddIcon,
  MinusIcon,
  Skeleton,
  Text,
} from 'uikit'
import { useLocation } from 'react-router-dom'
import { BigNumber } from 'bignumber.js'
import Balance from 'components/Balance'
import { useFarmUser, useLpTokenPrice } from 'state/hooks'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useTranslation } from 'contexts/Localization'
import { useApprove } from 'hooks/useApprove'
import { useERC20 } from 'hooks/useContract'
import { BASE_ADD_LIQUIDITY_URL } from 'config/config'
import { useAppDispatch } from 'state'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import {
  getBalanceAmount,
  getBalanceNumber,
  getFullDisplayBalance,
} from 'utils/formatBalance'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import { ActionContainer, ActionTitles, ActionContent, Earned } from './styles'
import { useAccount } from 'wagmi'

const IconButtonWrapper = styled.div`
  display: flex;
`

const StakedAction = ({
  isTokenOnly,
  pid,
  lpSymbol,
  lpAddresses,
  quoteToken,
  token,
  userDataReady,
  withDepositLockDiscount,
  depositFee,
  userData,
  hasDiscount,
}) => {
  const { t } = useTranslation()
  const { address } = useAccount()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const {
    allowance,
    tokenBalance: tokenBalanceAsString,
    stakedBalance: stakedBalanceAsString,
  } = useFarmUser(pid)
  const decimals = isTokenOnly ? token.decimals : 18
  const tokenBalance = new BigNumber(tokenBalanceAsString).times(
    new BigNumber(10).pow(18 - decimals)
  )
  const stakedBalance = new BigNumber(stakedBalanceAsString).times(
    new BigNumber(10).pow(18 - decimals)
  )
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)
  const location = useLocation()
  const lpPrice = useLpTokenPrice(lpSymbol)

  const isApproved = address && allowance && allowance.isGreaterThan(0)

  const lpAddress = isTokenOnly ? token.address : lpAddresses
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const handleStake = async (amount, daysToLock) => {
    await onStake(amount, daysToLock * 60 * 60 * 24)
    dispatch(fetchFarmUserDataAsync({ account: address, pids: [pid] }))
  }

  const handleUnstake = async (amount) => {
    await onUnstake(amount)
    dispatch(fetchFarmUserDataAsync({ account: address, pids: [pid] }))
  }

  const displayBalance = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
      return getFullDisplayBalance(stakedBalance).toLocaleString()
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }, [stakedBalance])

  const _depositFee = hasDiscount
    ? (parseFloat(depositFee) / 2).toString()
    : depositFee

  const [onPresentDeposit] = useModal(
    <DepositModal
      pid={pid}
      account={address}
      max={tokenBalance}
      onConfirm={handleStake}
      tokenName={lpSymbol}
      addLiquidityUrl={addLiquidityUrl}
      withDepositLockDiscount={withDepositLockDiscount}
      depositFee={_depositFee}
      unlockTime={userData.unlockTime}
    />
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={handleUnstake}
      tokenName={lpSymbol}
      unlockTime={userData.unlockTime}
    />
  )
  const lpContract = useERC20(lpAddress)
  const dispatch = useAppDispatch()
  const { onApprove } = useApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(fetchFarmUserDataAsync({ account: address, pids: [pid] }))

      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, dispatch, address, pid])

  if (!address) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text textTransform='uppercase' color='textSubtle' fontSize='12px'>
            {t('Start Farming')}
          </Text>
        </ActionTitles>
        <ActionContent>Unlock</ActionContent>
      </ActionContainer>
    )
  }

  if (isApproved) {
    if (stakedBalance.gt(0)) {
      return (
        <ActionContainer>
          <ActionTitles>
            <Text
              textTransform='uppercase'
              color='secondary'
              fontSize='12px'
              pr='4px'
            >
              {lpSymbol}
            </Text>
            <Text textTransform='uppercase' color='textSubtle' fontSize='12px'>
              {t('Staked')}
            </Text>
          </ActionTitles>
          <ActionContent>
            <div>
              <Earned>{displayBalance()}</Earned>
              {stakedBalance.gt(0) && lpPrice.gt(0) && (
                <Balance
                  fontSize='12px'
                  color='textSubtle'
                  decimals={2}
                  value={getBalanceNumber(lpPrice.times(stakedBalance))}
                  unit=' USD'
                  prefix='~'
                />
              )}
            </div>
            <IconButtonWrapper>
              <IconButton
                variant='secondary'
                onClick={onPresentWithdraw}
                mr='6px'
              >
                <MinusIcon color='primary' width='14px' />
              </IconButton>
              <IconButton
                variant='secondary'
                onClick={onPresentDeposit}
                disabled={['history', 'archived'].some((item) =>
                  location.pathname.includes(item)
                )}
              >
                <AddIcon color='primary' width='14px' />
              </IconButton>
            </IconButtonWrapper>
          </ActionContent>
        </ActionContainer>
      )
    }

    return (
      <ActionContainer>
        <ActionTitles>
          <Text
            textTransform='uppercase'
            color='textSubtle'
            fontSize='12px'
            pr='4px'
          >
            {t('Stake').toUpperCase()}
          </Text>
          <Text textTransform='uppercase' color='secondary' fontSize='12px'>
            {lpSymbol}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Button
            width='100%'
            onClick={onPresentDeposit}
            disabled={['history', 'archived'].some((item) =>
              location.pathname.includes(item)
            )}
            style={{
              background: 'linear-gradient(90deg,#68a7f8 1.82%,#0052ff 100%)',
              color: '#ffffff',
              fontWeight: 500,
            }}
          >
            {t('Stake')}
          </Button>
        </ActionContent>
      </ActionContainer>
    )
  }

  if (!userDataReady) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text textTransform='uppercase' color='textSubtle' fontSize='12px'>
            {t('Start Farming')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Skeleton width={180} marginBottom={28} marginTop={14} />
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Text textTransform='uppercase' color='white' fontSize='12px'>
          {t('Enable Farm')}
        </Text>
      </ActionTitles>
      <ActionContent>
        <Button
          width='100%'
          disabled={requestedApproval}
          onClick={handleApprove}
          style={{
            background: 'linear-gradient(90deg,#68a7f8 1.82%,#0052ff 100%)',
            color: '#ffffff',
            fontWeight: 500,
          }}
        >
          {t('Enable')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default StakedAction
