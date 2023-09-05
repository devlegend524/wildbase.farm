import React, { useState, useEffect } from 'react'

import { usePresaleContract, useWildNFT } from 'hooks/useContract'
import { useAccount, useNetwork } from 'wagmi'
import { notify } from 'utils/toastHelper'
import { useEthersSigner } from 'hooks/useEthers'
import { CHAIN_ID, TESTNET_CHAIN_ID } from 'config/config'
import {
  fromReadableAmount,
  toReadableAmount,
  didUserReject,
} from 'utils/customHelpers'
import PresaleDetail from 'components/PresaleDetail'
import SaleComponent from 'components/SaleComponent'
import ClaimComponent from 'components/ClaimComponent'

export default function Presale() {
  const [active, setActive] = useState(0)
  const [started, setStated] = useState(false)
  const [finished, setFinished] = useState(false)
  const [owned, setOwned] = useState(false)
  const [myNFT, setMyNFT] = useState(null)
  const [claimable, setClaimable] = useState(null)

  const { address } = useAccount()
  const { chain } = useNetwork()
  const wildNFTContract = useWildNFT()
  const presaleContract = usePresaleContract()
  const [totalRaised, setTotalRaised] = useState(0)
  const [userDeposited, setUserDeposited] = useState(0)

  const signer = useEthersSigner()

  const getMyNFT = async () => {
    const myNFTs = await wildNFTContract.walletOfOwner(address)
    console.log(myNFTs)
    if (myNFTs.length > 0) {
      setOwned(true)
      setMyNFT(myNFTs[0])
      notify('info', 'You already minted a NFT.')
    } else {
      notify('warning', 'You must have an WILD NFT to buy token!')
    }
  }
  const getTotal = async () => {
    const totalDeposited = await presaleContract.getTotalRaised()
    setTotalRaised(toReadableAmount(totalDeposited, 18))

    const userDeposites = await presaleContract.getUserDeposits(address)
    setUserDeposited(toReadableAmount(userDeposites, 18))

    const enabled = await presaleContract.enabled()
    setStated(enabled)

    const sale_finalized = await presaleContract.sale_finalized()
    setFinished(sale_finalized)

    const userWILDOwned = await presaleContract.getWILDOwned(address)
    console.log(userWILDOwned)
    setClaimable(toReadableAmount(userWILDOwned, 18))
  }

  const buyWILDToken = async (amount) => {
    try {
      const tx = await presaleContract.buyWILD({
        from: address,
        value: fromReadableAmount(amount),
      })
      await tx.wait()
      notify('success', 'You bought WILD TOKENs successfully')
      notify('info', 'You can claim tokens after presale finished')
    } catch (error) {
      if (didUserReject(error)) {
        notify('warning', 'User Rejected transaction')
        return
      } else {
        notify('warning', 'Please check your network status or balance')
        return
      }
    }
  }

  const claimWILD = async () => {
    try {
      const tx = await presaleContract.withdrawWILD({
        from: address,
      })
      await tx.wait()
      notify('success', 'You claimed tokens successfully')
      notify('info', 'You can claim tokens again after 1 hours')
      window.localStorage.setItem('lastClaimedTime', Date.now())
    } catch (error) {
      if (didUserReject(error)) {
        notify('warning', 'User Rejected transaction')
        return
      } else {
        notify(
          'warning',
          'Please check your network status or You are not available to claim tokens yet'
        )
        return
      }
    }
  }

  useEffect(() => {
    if (
      chain &&
      (chain.id === CHAIN_ID || chain.id === TESTNET_CHAIN_ID) &&
      address &&
      signer
    ) {
      getMyNFT()
      getTotal()
    }
  }, [address, signer, chain])

  return (
    <div className='presale mb-20'>
      <div className='presale_banner'>PRESALE WILD BASE</div>
      <div className='presale_content'>
        <div className='card'>
          <div className='presale_card'>
            <div className='tab_box'>
              <div
                className={`tab_panel  + ${active === 0 ? 'active' : ''}`}
                onClick={() => setActive(0)}
              >
                SALE
              </div>
              <div
                className={`tab_panel  + ${active === 1 ? 'active' : ''}`}
                onClick={() => setActive(1)}
              >
                CLAIM
              </div>
            </div>
            {active === 0 ? (
              <SaleComponent
                totalRaised={totalRaised}
                isPrivateParticipant={
                  owned && myNFT !== null && Number(myNFT) < 13
                }
                userDeposited={userDeposited}
                buyWILDToken={buyWILDToken}
                hasNFT={owned}
                started={started}
                finished={finished}
              />
            ) : (
              <ClaimComponent
                claimWILD={claimWILD}
                finished={finished}
                userDeposited={userDeposited}
                claimable={claimable}
              />
            )}
          </div>
        </div>
        <PresaleDetail
          totalRaised={totalRaised}
          isPrivateParticipant={owned && myNFT !== null && Number(myNFT) < 13}
          userDeposited={userDeposited}
        />
      </div>
    </div>
  )
}
