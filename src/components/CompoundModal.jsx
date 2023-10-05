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
import { getFarmFromPid } from 'utils/farmHelpers'
import { didUserReject } from 'utils/customHelpers'
import { sleep } from 'utils/customHelpers'

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

export default function CompoundModal({ open, closeModal, earnings, pid, isAll }) {
  const { t } = useTranslation()
  const [targetToken, setTargetToken] = useState(!isAll ? getFarmFromPid(pid) : getFarmFromPid(0))
  const [pendingZapTx, setZapPendingTx] = useState(false)
  const [allowance, setAllowance] = useState(0)
  const [isApproving, setIsApproving] = useState(false)

  const { address } = useAccount()
  const zapAddress = getZapAddress()
  const signer = useEthersSigner()
  const wildXContract = getWILDXContract(signer)
  const { onReward } = useHarvest(!isAll ? pid : 0)
  const { onZapForFarm } = useZapForFarm()
  const masterChefContract = useMasterchef()

  const dispatch = useAppDispatch()

  const getAllowance = async () => {
    const allowance = await wildXContract.allowance(address, zapAddress, {
      from: address,
    })
    setAllowance(allowance.toString())
  }

  async function handleApprove() {
    try {
      setIsApproving(true)
      const allowance = await wildXContract.allowance(address, zapAddress, {
        from: address,
      })
      if (
        Number(ethers.utils.formatUnits(allowance, 'ether')) <
        Number(earnings.toString())
      ) {
        const tx = await wildXContract.approve(zapAddress, ethers.constants.MaxUint256, {
          from: address,
        })
        await tx.wait()
      }
      setIsApproving(false)
    } catch (e) {
      console.log(e)
      if (didUserReject(e)) {
        notify('error', 'User rejected transaction')
      }
      setIsApproving(false)
    }
  }

  async function handleDeposit() {
    setZapPendingTx(true)
    try {
      if (pid.length === 1) await onReward(false)
      else await harvestMany(masterChefContract, pid, false, address)
      await sleep(2000)
      await onZapForFarm(
        farms[0].lpAddresses,
        false,
        ethers.utils.parseEther(earnings.toString() || '1'),
        targetToken.lpAddresses,
        targetToken.pid
      )
      dispatch(fetchFarmUserDataAsync({ account: address, pids: pid }))
      closeModal()
      setZapPendingTx(false)
    } catch (e) {
      if (didUserReject(e)) {
        notify('error', 'User rejected transaction')
      }
      setZapPendingTx(false)
    }
  }

  const handleChangeToken = (e, type) => {
    setTargetToken(farms[Number(e)])
  }

  useEffect(() => {
    getAllowance()
  })

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
        {isAll ? (
          <>
            <p className='text-center text-gray-400 text-sm py-2'>
              Select target pool.
            </p>
            <div className='bg-secondary-700 rounded-full p-2 flex mb-2'>
              <select
                name='tokenA'
                className='bg-transparent focus-visible:outline-none w-full cursor-pointer'
                onChange={(e) => handleChangeToken(e.target.value)}
              >
                {farms.map((item, key) => {
                  if (item.lpSymbol !== 'WETH-USDC' && item.lpSymbol !== 'WETH')
                    return (
                      <option key={key} className='bg-secondary-700' value={key}>
                        {item?.lpSymbol}
                      </option>
                    )
                })}
              </select>
            </div>
          </>
        ) : (
          <></>
        )}

        <p className='text-center text-lg pt-4'>
          Compound {' '}
          <span className='font-semibold text-green-500 mx-1'>
            {farms[0].lpSymbol}
          </span>
          into{' '}
          <span className='font-semibold text-green-500 mx-1'>
            {targetToken?.lpSymbol}
          </span>{' '}
          Pool
        </p>
        <p className='text-center my-2'>
          Available: {Number(earnings.toString()).toFixed(3)} WILDX
        </p>
        <div className='flex gap-3 pt-4'>
          <button
            className='border border-gray-600 w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px]'
            onClick={closeModal}
          >
            Cancel
          </button>
          {
            Number(ethers.utils.formatUnits(allowance, 'ether')) === 0 ? <button
              onClick={handleApprove}
              disabled={isApproving}
              className='border disabled:opacity-50 disabled:hover:scale-100 border-secondary-700 w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px] bg-secondary-700'
            >
              {isApproving ? <div className='flex justify-center gap-1'><Loading /> Approving...</div> : 'Approve'}{' '}
            </button> :
              <button
                onClick={handleDeposit}
                className='border disabled:opacity-50 disabled:hover:scale-100 border-secondary-700 w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px] bg-secondary-700'
                disabled={Number(earnings) === 0 || pendingZapTx}
              >
                {pendingZapTx ? <Loading /> : t('Compound')}
              </button>
          }

        </div>
      </div>
    </Modal>
  )
}
