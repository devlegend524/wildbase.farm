import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { ethers } from 'ethers'
import {
  useAccount,
  erc20ABI,
  useContractRead,
} from 'wagmi'
import TokenDisplay from 'components/TokenDisplay'
import { getZapAddress } from 'utils/addressHelpers'
import lpTokenAbi from 'config/abi/lpToken'
import useZap from 'hooks/useZap'
import Loading from './Loading'
import { notify } from 'utils/toastHelper'
import { getErc20Contract, getLpContract } from 'utils/contractHelpers'
import { useEthersSigner } from 'hooks/useEthers'
import { didUserReject } from 'utils/customHelpers'
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

export default function ZapperDepositModal(props) {
  const zapAddress = getZapAddress()
  const [open, setOpen] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const { address } = useAccount()
  const { onZap } = useZap()
  const tokenABI = props.tokenA.isTokenOnly ? erc20ABI : lpTokenAbi

  const [allowance, setAllowance] = useState(0)
  const [pendingTx, setPendingTx] = useState(false)
  const [amount, setAmount] = useState('')
  const signer = useEthersSigner();

  const getAllowance = async () => {
    let tokenContract;
    if (props.tokenA.isTokenOnly) {
      tokenContract = getErc20Contract(props.tokenA.lpAddresses, signer)
    } else {
      tokenContract = getLpContract(props.tokenA.lpAddresses, signer)
    }
    const tokenAllowance = await tokenContract.allowance(address, zapAddress, { from: address })
    setAllowance(tokenAllowance.toString())
  }
  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
    setAmount('')
  }
  async function handleApprove() {
    try {
      if (
        Number(ethers.utils.formatUnits(allowance, 'ether')) < Number(amount)
      ) {
        console.log('approving...')
        setIsApproving(true)
        let tokenContract;
        if (props.tokenA.isTokenOnly) {
          tokenContract = getErc20Contract(props.tokenA.lpAddresses, signer)
        } else {
          tokenContract = getLpContract(props.tokenA.lpAddresses, signer)
        }
        await tokenContract.approve(zapAddress, ethers.constants.MaxUint256, { from: address })
        setIsApproving(false)
      }
    } catch (e) {
      console.log(e)
      if (didUserReject(e)) {
        notify('error', 'User rejected transaction')
      }
      setIsApproving(false)
    }
  }
  async function handleDeposit() {
    try {
      console.log('zapping...')
      setPendingTx(true)
      await onZap(
        props.tokenA.lpAddresses,
        ethers.utils.parseEther(amount.toString() || '1'),
        props.tokenB.lpAddresses
      )
      console.log('zapped...')
      notify('success', 'You have successfully zapped token pair')
      closeModal()
      setPendingTx(false)
    } catch (e) {
      console.log(e)
      if (didUserReject(e)) {
        notify('error', 'User rejected transaction')
      }
      setPendingTx(false)
    }
  }
  function setMaximum() {
    setAmount(Number(props.availableA))
  }
  useEffect(() => {
    getAllowance()
  })
  return (
    <>
      <div className='flex justify-center pb-16 m-2'>
        <button
          className='bg-secondary-700 rounded-lg p-3 hover:scale-105 transition ease-in-out'
          onClick={openModal}
        >
          {props.tokenA.lpSymbol} into {props.tokenB.lpSymbol}
        </button>
      </div>

      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className='min-w-[350px] max-w-[500px] w-full p-6 rounded-lg'>
          <div className='flex justify-around'>
            <TokenDisplay token={props.tokenA} modal={true} />
            <TokenDisplay token={props.tokenB} modal={true} />
          </div>
          <p className='text-center text-lg pt-4'>
            {props.tokenA.lpSymbol} into {props.tokenB.lpSymbol}
          </p>
          <p className='text-center text-gray-400 text-sm py-2'>
            Select any amount of tokens.
          </p>

          <div className='form_input'>
            <input
              type='number'
              placeholder='0.0'
              className='h-[45px!important] placeholder-[gray!important]'
              value={amount}
              min={0}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <p className='flex justify-end text-right'>
            Available: <div className='cursor-pointer' onClick={setMaximum}>{Number(props.availableA).toFixed(5)}</div>
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
              </button> : <button
                onClick={handleDeposit}
                disabled={(Number(amount) <= 0 || props.availableA < amount) || pendingTx || isApproving}
                className='border disabled:opacity-50 disabled:hover:scale-100 border-secondary-700 w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px] bg-secondary-700'
              >
                {pendingTx ? <div className='flex justify-center gap-1'><Loading /> Zapping...</div> : 'Deposit'}{' '}
              </button>
            }
          </div>
        </div>
      </Modal>
    </>
  )
}
