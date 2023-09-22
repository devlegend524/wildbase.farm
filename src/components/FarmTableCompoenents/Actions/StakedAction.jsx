import React, { useState, useCallback } from 'react'
import { useModal, IconButton, AddIcon, MinusIcon, Skeleton, Text } from 'uikit'
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
import { Tooltip } from 'react-tooltip'

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
    try {
      await onStake(amount)
      dispatch(fetchFarmUserDataAsync({ account: address, pids: [pid] }))
    } catch (e) {
      console.log(e)
    }
  }

  const handleUnstake = async (amount) => {
    try {
      await onUnstake(amount)
      dispatch(fetchFarmUserDataAsync({ account: address, pids: [pid] }))
    } catch (e) {
      console.log(e)
    }
  }

  const displayBalance = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
      return getFullDisplayBalance(stakedBalance, 18, 4).toLocaleString()
    }
    return stakedBalanceBigNumber.toFixed(4, BigNumber.ROUND_DOWN)
  }, [stakedBalance])

  const _depositFee = depositFee

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
          <Text color='white' fontSize='20px'>
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
        <div className='flex flex-row items-center justify-between md:justify-end gap-5 p-2 lg:p-4 w-full'>
          <div className='flex flex-col gap-1 justify-between md:min-w-[200px]'>
            <div className='text-lg font-semibold'>
              {lpSymbol}
              &nbsp;
              {t('Staked')}
            </div>
            <Earned>{displayBalance()}</Earned>
            {stakedBalance.gt(0) && lpPrice.gt(0) && (
              <Balance
                fontSize='15px'
                color='white'
                decimals={2}
                value={getBalanceNumber(lpPrice.times(stakedBalance))}
                unit=' USD'
                prefix='~'
              />
            )}
          </div>
          <div className='flex flex-row items-center'>
            <IconButton
              variant='secondary'
              data-tooltip-id='unstake-tooltip'
              data-tooltip-content='Unstake Pool'
              onClick={onPresentWithdraw}
              mr='6px'
            >
              <MinusIcon color='primary' width='14px' />
            </IconButton>
            <IconButton
              variant='secondary'
              data-tooltip-id='stake-tooltip'
              data-tooltip-content='Stake pool'
              onClick={onPresentDeposit}
              disabled={['history', 'archived'].some((item) =>
                location.pathname.includes(item)
              )}
            >
              <AddIcon color='primary' width='14px' />
            </IconButton>
            <Tooltip id='unstake-tooltip' />
            <Tooltip id='stake-tooltip' />
          </div>
        </div>
      )
    }

    return (
      <div className='flex flex-row md:flex-col justify-between md:justify-center items-center gap-4 p-2 lg:p-4 w-full'>
        <div className='flex justify-center font-semibold text-xl w-full'>
          {t('Stake').toUpperCase()} {lpSymbol}
        </div>
        <div className='flex w-full justify-center'>
          <button
            onClick={onPresentDeposit}
            disabled={['history', 'archived'].some((item) =>
              location.pathname.includes(item)
            )}
            className='rounded-md p-1  text-center text-white font-medium bg-blue-600 hover:bg-blue-500  max-w-[200px] w-full'
          >
            {t('Stake')}
          </button>
        </div>
      </div>
    )
  }

  if (!userDataReady) {
    return (
      <div className='flex flex-row md:flex-col justify-between md:justify-center items-center gap-4 p-2 lg:p-4 w-full'>
        <div className='flex justify-center font-semibold text-xl w-full'>
          {t('Start Farming')}
        </div>
        <div className='flex w-full justify-center'>
          <Skeleton width={180} marginBottom={28} marginTop={14} />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-row md:flex-col justify-between md:justify-center items-center gap-4 p-2 lg:p-4 w-full'>
      <div className='flex justify-center font-semibold text-xl w-full'>
        {t('Enable Farm')}
      </div>
      <div className='flex w-full justify-center'>
        <button
          disabled={requestedApproval}
          onClick={handleApprove}
          className='rounded-md p-1  text-center text-white font-medium bg-blue-600 hover:bg-blue-500  max-w-[200px] w-full'
        >
          {requestedApproval ? t('Approving...') : t('Enable')}
        </button>
      </div>
    </div>
  )
}

export default StakedAction
