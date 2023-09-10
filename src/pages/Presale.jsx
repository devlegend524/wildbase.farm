import React, { useState, useEffect } from 'react'

import { usePresaleContract } from 'hooks/useContract'
import { useAccount, useNetwork } from 'wagmi'
import { notify } from 'utils/toastHelper'
import { useEthersSigner } from 'hooks/useEthers'
import { CHAIN_ID, TESTNET_CHAIN_ID } from 'config/config'
import {
  fromReadableAmount,
  toReadableAmount,
  didUserReject,
} from 'utils/customHelpers'
import ClaimComponent from 'components/ClaimComponent'

export default function Presale() {
  const [active, setActive] = useState(0)
  const [finished, setFinished] = useState(false)
  const [claimable, setClaimable] = useState(null)

  const { address } = useAccount()
  const { chain } = useNetwork()
  const presaleContract = usePresaleContract()

  const signer = useEthersSigner()

  const getTotal = async () => {
    const enabled = await presaleContract.enabled()
    setFinished(enabled)

    const userWILDOwned = await presaleContract.getWILDOwned(address)
    console.log(userWILDOwned)
    setClaimable(toReadableAmount(userWILDOwned, 18))
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
  const addClaimableList = async () => {
    const claimableList = {
      '0xeceaa86faf63aa1a7314988de6c42a0dd12c8e70': 846,
      '0xe9DE1d5692fb5ff51bAa124617f6F84b34F4dF29': 3367,
      '0xfA040a07183A456E9c2210287330cBa168E123c8': 931,
      '0xECEAa86Faf63AA1A7314988De6C42a0DD12C8e70': 846,
      '0x74cbc55f2292f8ce097fce80e3a8d0833655adb8': 2282,
      '0x8dFc8e0ED939C78cefaF531656803EcF3C30074D': 4706,
      '0x4Bb7fba588B4254536DE4316e8FB346bbe275EcB': 12579,
      '0xC202d94CbD66Fb7Ec7cd3216b1422F40c31e8aF4': 838,
      '0x80FfDB971b568150f7639B37ed882e0346Eb858C': 522,
      '0xD3F9Fdc072E169F09A49132963E45d8De055815D': 6847,
      '0x7B0A1401C4969523c4352441b2Bad07a42125578': 571,
      '0xa8a0e45F3EbCADFAF20F316247C3211df8813D25': 1802,
      '0x74CBC55f2292f8Ce097fCe80e3a8d0833655adb8': 2282,
      '0x10E4C2C95AE13EAf2f76a2020dF1C1E96b733132': 1873,
      '0x01D4cdCb4EB82490Aa0e253648A93eff4918CBC5': 837,
      '0xefC9c2A1f244A5922EC118bEe0C950BDDb3d8870': 4884,
      '0xf1fc88b54eDCE8ce37644C25d35b347A583cf1ea': 2115,
      '0x064aD2c68eeeC66370F8a898ec990102f0B4F04F': 3213,
      '0x9D23eEBCf1533269266c7c1ADDD6e98c860A3399': 433,
      '0xdfCeC744c8417d2A0Ef72fE520438dd20F368369': 2241,
      '0x819A054a7054ae012500cDD3187A44Ecc4dc475a': 1590,
      '0x8F31DEa048B039A4f4ab3327C78282014cDEc158': 1556,
      '0x0a278C37c9966B7D4010610572E47521649Cf57d': 1146,
    }
    const values = Object.values(claimableList)
    let formatedValues = []
    let sum = 0
    for (let i = 0; i < values.length; i++) {
      formatedValues.push(fromReadableAmount(values[i], 18))
      sum += values[i]
    }
    console.log(sum)
    // const tx = await presaleContract.addClaimerList(
    //   Object.keys(claimableList),
    //   formatedValues,
    //   {
    //     from: address,
    //   }
    // )
    // await tx.wait()
  }
  useEffect(() => {
    if (chain && chain.id === CHAIN_ID && signer) {
      getTotal()
    }
  }, [signer, chain])

  // useEffect(() => {
  //   if (chain && chain.id === CHAIN_ID && signer) {
  //     addClaimableList()
  //   }
  // }, [])
  return (
    <div className='presale mb-20'>
      <div className='presale_banner'>ClAIM WILD BASE</div>
      <div className='presale_content'>
        <div className='card'>
          <div className='presale_card'>
            <div className='tab_box'>
              <div
                className={`tab_panel  + ${active === 1 ? 'active' : ''}`}
                onClick={() => setActive(0)}
              >
                SALE
              </div>
              <div
                className={`tab_panel  + ${active === 0 ? 'active' : ''}`}
                onClick={() => setActive(0)}
              >
                CLAIM
              </div>
            </div>
            <ClaimComponent
              claimWILD={claimWILD}
              finished={finished}
              claimable={claimable}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
