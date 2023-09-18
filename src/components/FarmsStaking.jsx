import React, { useState, useCallback } from 'react'
import { useAccount, useTransaction } from 'wagmi'
import { Button } from 'uikit'
import { useEthersSigner } from 'hooks/useEthers'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useMasterchef } from 'hooks/useContract'
import { useFarmsWithBalance } from 'hooks/useFarmsWithBalance'
import { harvest } from 'utils/callHelpers'
import { notify } from 'utils/toastHelper'
import { useTranslation } from 'contexts/Localization'
import WILDXHarvestBalance from './FarmStackingComponents/WILDXHarvestBalance'
import WILDXWalletBalance from './FarmStackingComponents/WILDXWalletBalance'

export default function () {
  const [pendingTx, setPendingTx] = useState(false)
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
    // eslint-disable-next-line no-restricted-syntax
    for (const farmWithBalance of balancesWithValue) {
      try {
        // eslint-disable-next-line no-await-in-loop
        console.log(farmWithBalance.pid)
        await harvest(masterChefContract, farmWithBalance.pid, signer)
      } catch (error) {
        notify('error', error?.message)
      }
    }
    setPendingTx(false)
  }, [signer, balancesWithValue, masterChefContract])

  return (
    <div className='flex-1 main_bg p-8 rounded-md'>
      <div className='text-3xl text-end'>Farms & Staking</div>
      <div className='text-base py-4'>2WILD to Harvest:</div>
      <div className='text-sm text-gray-300'>
        <WILDXHarvestBalance farmsWithBalance={balancesWithValue} />
      </div>
      <div className='text-base py-4'>2WILD in Wallet:</div>
      <div className='text-sm text-gray-300'>
        <WILDXWalletBalance />
      </div>
      <div className='mt-10'>
        {address ? (
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
            {pendingTx
              ? t('Collecting 2WILD')
              : t('Harvest all (%count%)', {
                  count: balancesWithValue.length,
                })}
          </Button>
        ) : (
          <ConnectButton />
        )}
      </div>
    </div>
  )
}
