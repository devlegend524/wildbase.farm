import React, { useState, useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Button } from 'uikit'
import { useEthersSigner } from 'hooks/useEthers'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useMasterchef } from 'hooks/useContract'
import { useFarmsWithBalance } from 'hooks/useFarmsWithBalance'
import { harvestMany } from 'utils/callHelpers'
import { notify } from 'utils/toastHelper'
import { useTranslation } from 'contexts/Localization'
import WILDXHarvestBalance from './FarmStackingComponents/WILDXHarvestBalance'
import WILDXWalletBalance from './FarmStackingComponents/WILDXWalletBalance'
import Loading from 'components/Loading'
import ZapInModal from './ZapInModal'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config/config'

export default function () {
  const [pendingTx, setPendingTx] = useState(false)
  const [pendingCompoundTx, setCompoundPendingTx] = useState(false)
  const [earnings, setEarnings] = useState(false)
  const [open, setOpen] = useState(false)
  const [pids, setPids] = useState([])

  const { address } = useAccount()
  const signer = useEthersSigner()
  const { t } = useTranslation()
  const farmsWithBalance = useFarmsWithBalance()
  const masterChefContract = useMasterchef()

  const balancesWithValue = farmsWithBalance.filter((balanceType) =>
    balanceType.balance.gt(0)
  )
  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      if (pids.length > 0)
        // eslint-disable-next-line no-await-in-loop
        await harvestMany(masterChefContract, pids, false, signer)
    } catch (error) {
      notify('error', error?.message)
    }
    setPendingTx(false)
  }, [signer, balancesWithValue, masterChefContract, pids])

  const compoundAllFarms = useCallback(async () => {
    setCompoundPendingTx(true)
    try {
      if (pids.length > 0)
        // eslint-disable-next-line no-await-in-loop
        await harvestMany(masterChefContract, pids, true, signer)
    } catch (error) {
      notify('error', error?.message)
    }
    setCompoundPendingTx(false)
  }, [signer, balancesWithValue, masterChefContract, pids])

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  useEffect(() => {
    let _pids = []
    // eslint-disable-next-line no-restricted-syntax
    for (const farmWithBalance of balancesWithValue) {
      _pids.push(farmWithBalance.pid)
    }
    setPids(_pids)
    const earningsSum = farmsWithBalance.reduce((accum, earning) => {
      const earningNumber = new BigNumber(earning.balance)
      if (earningNumber.eq(0)) {
        return accum
      }
      return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
    }, 0)
    setEarnings(earningsSum)
  }, [balancesWithValue])

  return (
    <div className='flex-1 main_bg p-8 rounded-md'>
      <div className='text-3xl text-end'>Farms & Staking</div>
      <div className='text-base pb-2'>2WILD to Harvest:</div>
      <div className='text-sm text-gray-300'>
        <WILDXHarvestBalance farmsWithBalance={balancesWithValue} />
      </div>
      <div className='text-base pb-2'>2WILD in Wallet:</div>
      <div className='text-sm text-gray-300'>
        <WILDXWalletBalance />
      </div>
      <div className='mt-5 flex flex-col md:flex-row justify-between gap-3'>
        {address ? (
          <>
            <Button
              id='harvest-all'
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width='100%'
              style={{
                background: '#031531',
                color: '#ddd',
                fontWeight: 500,
              }}
            >
              {pendingTx ? (
                <Loading />
              ) : (
                t('Harvest all (%count%)', {
                  count: balancesWithValue.length,
                })
              )}
            </Button>
            <Button
              id='harvest-all'
              disabled={balancesWithValue.length <= 0 || pendingCompoundTx}
              onClick={compoundAllFarms}
              width='100%'
              style={{
                background: '#031531',
                color: '#ddd',
                fontWeight: 500,
              }}
            >
              {pendingCompoundTx ? <Loading /> : t('Compound all')}
            </Button>
            <Button
              id='harvest-all'
              disabled={balancesWithValue.length <= 0}
              onClick={openModal}
              width='100%'
              style={{
                background: '#031531',
                color: '#ddd',
                fontWeight: 500,
              }}
            >
              {t('Zap all')}
            </Button>
          </>
        ) : (
          <ConnectButton />
        )}
      </div>
      <ZapInModal
        open={open}
        closeModal={closeModal}
        earnings={earnings}
        pid={pids}
      />
    </div>
  )
}
