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
import { getErc20Contract } from 'utils/contractHelpers'
import { useHarvest } from 'hooks/useHarvest'
import { notify } from 'utils/toastHelper'
import { harvestMany } from 'utils/callHelpers'
import { useMasterchef } from 'hooks/useContract'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { getFarmFromPid } from 'utils/farmHelpers'
import { didUserReject, fromReadableAmount, toReadableAmount } from 'utils/customHelpers'
import { Input } from 'uikit'

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
const tokensList = [
  {
    pid: 1,
    lpSymbol: 'WETH',
    isTokenOnly: true,
    lpAddresses: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    logoA: '/images/tokens/weth.svg',
    logoB: ''
  },
]

export default function ZapInModal({ open, closeModal, pid }) {
  const { t } = useTranslation()
  const [targetToken, setTargetToken] = useState(pid ? getFarmFromPid(pid) : getFarmFromPid(1))
  const [inputToken, setInputToken] = useState(tokensList[0])
  const [pendingZapTx, setZapPendingTx] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [loadingBalance, setLoadingBalance] = useState(false)
  const [allowance, setAllowance] = useState(0)

  const [amount, setAmount] = useState('')
  const [balance, setBalance] = useState(0)
  const { address } = useAccount()
  const zapAddress = getZapAddress()
  const signer = useEthersSigner()
  const { onReward } = useHarvest(pid)
  const { onZapForFarm } = useZapForFarm()
  const masterChefContract = useMasterchef()
  const dispatch = useAppDispatch()

  const getAllowance = async () => {
    const tokenContract = getErc20Contract(inputToken.lpAddresses, signer)
    const allowance = await tokenContract.allowance(address, zapAddress, {
      from: address,
    })
    setAllowance(allowance.toString())
  }

  async function handleApprove() {
    try {
      setIsApproving(true)
      const tokenContract = getErc20Contract(inputToken.lpAddresses, signer)
      if (
        Number(ethers.utils.formatUnits(allowance, inputToken.decimals)) <
        Number(amount.toString())
      ) {
        await tokenContract.approve(zapAddress, ethers.constants.MaxUint256, {
          from: address,
        })
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
    if (pid.length === 0) return
    setZapPendingTx(true)
    try {
      await onZapForFarm(
        inputToken.lpAddresses,
        fromReadableAmount(amount.toString(), inputToken.decimals),
        targetToken.lpAddresses,
        targetToken.pid
      )
      dispatch(fetchFarmUserDataAsync({ account: address, pids: pid }))
      closeModal()
      setZapPendingTx(false)
    } catch (e) {
      if (didUserReject(e)) {
        notify('error', 'User Rejected Transaction')
      }
      setZapPendingTx(false) // 21600
    }
  }

  const handleChangeToken = (e) => {
    setInputToken(tokensList[Number(e)])
    getBalance(tokensList[Number(e)])
  }

  const getBalance = async (token) => {
    try {
      setLoadingBalance(true)
      const tokenContract = getErc20Contract(token.lpAddresses, signer)
      const balance1 = await tokenContract.balanceOf(address);
      setBalance(toReadableAmount(balance1, token.decimals))
      setLoadingBalance(false)
    } catch (e) {
      setBalance(0)
      setLoadingBalance(false)
    }
  }

  useEffect(() => {
    setTargetToken(getFarmFromPid(pid))
    getBalance(tokensList[0])
  }, [pid, signer])

  useEffect(() => {
    getAllowance()
  })


  const onChange = (e) => {
    if (Number(e.target.value) > Number(balance)) {
      return;
    }
    setAmount(e.target.value)
  }
  const setMaxAmount = () => {
    setAmount(balance)
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
          <TokenDisplay token={inputToken} modal={true} />
          <ArrowForwardIcon />
          <TokenDisplay token={targetToken} modal={true} />
        </div>
        <p className='text-center text-gray-400 text-sm py-2'>
          Select token to zap.
        </p>
        <div className='bg-secondary-700 rounded-full p-2 flex mb-2'>
          <select
            name='tokenA'
            className='bg-transparent focus-visible:outline-none w-full cursor-pointer'
            onChange={(e) => handleChangeToken(e.target.value)}
          >
            {tokensList.map((item, key) => {
              if (item.lpSymbol === 'WETH' || item.lpSymbol === 'USDC')
                return (
                  <option key={key} className='bg-secondary-700' value={key}>
                    {item?.lpSymbol}
                  </option>
                )
            })}
          </select>
        </div>
        <div className='flex justify-between text-right my-2'>
          <div className='flex'>
            Available:  {loadingBalance ? <Loading /> : Number(balance.toString()).toFixed(4)} {inputToken.lpSymbol}
          </div>
          <div className='flex items-center justify-center'>
            <button className='px-2 bg-secondary-600 cursor-pointer rounded-full flex items-center justify-center' onClick={setMaxAmount}>max</button>
          </div>
        </div>
        <div className='bg-secondary-700 rounded-full p-2 flex mb-2'>
          <input
            pattern={`^[0-9]*[.,]?[0-9]{0,${inputToken.decimals}}$`}
            inputMode='decimal'
            step='any'
            min='0'
            max='1'
            type="text"
            onChange={(e) => onChange(e)}
            placeholder='0.000'
            className='bg-transparent focus-visible:outline-none w-full text-right px-2'
            value={amount}
          />
        </div>


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
                disabled={Number(amount) === 0 || pendingZapTx}
              >
                {pendingZapTx ? <Loading /> : t('Zap in')}
              </button>
          }

        </div>
      </div>
    </Modal>
  )
}
