import React, { useState, useEffect } from 'react'
import TokenDisplay from 'components/TokenDisplay'
import { getZapAddress } from 'utils/addressHelpers'
import farms from 'config/farms'
import { useZapForFarm } from 'hooks/useZap'
import Modal from 'react-modal'
import { ethers } from 'ethers'
import { ArrowForwardIcon } from 'uikit'
import Loading from 'components/Loading'
import { useTranslation } from 'contexts/Localization'
import { useEthersSigner } from 'hooks/useEthers'
import { useAccount } from 'wagmi'
import { getWILDXContract } from 'utils/contractHelpers'
import { useHarvest } from 'hooks/useHarvest'
import { notify } from 'utils/toastHelper'
import { harvestMany } from 'utils/callHelpers'
import { useMasterchef } from 'hooks/useContract'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#02264d',
    color: 'white',
    border: 'none',
  },
}

export default function ZapInModal({ open, closeModal, earnings, pid }) {
  const { t } = useTranslation()

  const [targetToken, setTargetToken] = useState(farms[1])
  const [pendingZapTx, setZapPendingTx] = useState(false)
  const { address } = useAccount()
  const zapAddress = getZapAddress()
  const signer = useEthersSigner()
  const wildXContract = getWILDXContract(signer)
  const { onReward } = useHarvest(pid.length > 0 ? pid[0] : 0)
  const { onZapForFarm } = useZapForFarm()
  const masterChefContract = useMasterchef()
  const dispatch = useAppDispatch()

  async function handleDeposit() {
    if (pid.length === 0) return
    setZapPendingTx(true)
    try {
      if (pid.length === 1) await onReward(false)
      else await harvestMany(masterChefContract, pid, false, address)
      const allowance = await wildXContract.allowance(address, zapAddress, {
        from: address,
      })
      if (
        Number(ethers.utils.formatUnits(allowance, 'ether')) <
        Number(earnings.toString())
      ) {
        await wildXContract.approve(zapAddress, ethers.constants.MaxUint256, {
          from: address,
        })
      }
      await onZapForFarm(
        farms[0].lpAddresses,
        ethers.utils.parseEther(earnings.toString() || '1'),
        farms[0].lpAddresses,
        targetToken.pid
      )
      dispatch(
        fetchFarmUserDataAsync({
          account: address,
          pids: [farms[0].pid],
        })
      )
      dispatch(fetchFarmUserDataAsync({ account: address, pids: pid }))
      notify(
        'success',
        'You have successfully zapped 2WILD token in ' +
          targetToken.lpSymbol +
          ' pool'
      )
      setZapPendingTx(false)
    } catch (e) {
      notify('error', 'Insufficient Balance to zap')
      setZapPendingTx(false)
    }
  }

  const handleChangeToken = (e, type) => {
    setTargetToken(farms[Number(e)])
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className='min-w-[350px] max-w-[500px] w-full p-6 rounded-lg'>
        <div className='flex justify-around items-center'>
          <TokenDisplay token={farms[0]} modal={true} />
          <ArrowForwardIcon />
          <TokenDisplay token={targetToken} modal={true} />
        </div>
        <p className='text-center text-gray-400 text-sm py-2'>
          Select token to zap in.
        </p>
        <div className='bg-secondary-700 rounded-full p-2 flex mb-2'>
          <select
            name='tokenA'
            className='bg-transparent focus-visible:outline-none w-full cursor-pointer'
            onChange={(e) => handleChangeToken(e.target.value)}
          >
            {farms.map((item, key) => {
              if (item.lpSymbol !== '2WILD' && item.lpSymbol !== 'WETH-USDC')
                return (
                  <option key={key} className='bg-secondary-700' value={key}>
                    {item?.lpSymbol}
                  </option>
                )
            })}
          </select>
        </div>
        <p className='text-center text-lg pt-4'>
          Restake{' '}
          <span className='font-semibold text-green-500 mx-1'>
            {farms[0].lpSymbol}
          </span>
          into{' '}
          <span className='font-semibold text-green-500 mx-1'>
            {targetToken.lpSymbol}
          </span>{' '}
          Pool
        </p>
        <p className='text-center my-2'>
          Available: {Number(earnings.toString()).toFixed(3)} 2WILD
        </p>
        <div className='flex gap-3 pt-4'>
          <button
            className='border border-gray-600 w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px]'
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            onClick={handleDeposit}
            className='border disabled:opacity-50 disabled:hover:scale-100 border-secondary-700 w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px] bg-secondary-700'
            disabled={Number(earnings) === 0 || pendingZapTx}
          >
            {pendingZapTx ? <Loading /> : t('Harvest & Zap in')}
          </button>
        </div>
      </div>
    </Modal>
  )
}
