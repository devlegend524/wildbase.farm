import React, { useEffect, useState } from 'react'
import { useWildNFT } from 'hooks/useContract'
import { useAccount, useNetwork, useBalance } from 'wagmi'
import { notify } from 'utils/toastHelper'
import { useEthersSigner } from 'hooks/useEthers'
import {
  CHAIN_ID,
  TESTNET_CHAIN_ID,
  privateNFTPrice,
  publicNFTPrice,
} from 'config/config'
import { fromReadableAmount, didUserReject } from 'utils/customHelpers'
export default function MintNFT() {
  const [owned, setOwned] = useState(false)
  const [totalSupply, setTotalSupply] = useState(null)
  const { address } = useAccount()
  const { chain } = useNetwork()
  const wildNFTContract = useWildNFT()
  const signer = useEthersSigner()

  const { data } = useBalance({
    address: address,
  })

  const getTotalSupply = async () => {
    const totalMinted = await wildNFTContract.totalSupply()
    setTotalSupply(Number(totalMinted))
  }

  const getMyNFT = async () => {
    const myNFTs = await wildNFTContract.walletOfOwner(address)
    if (myNFTs.length > 0) {
      setOwned(true)
      notify('info', 'You already minted a NFT.')
    }
  }

  const mintNFT = async () => {
    const availableBalance = data?.formatted
    console.log(availableBalance)

    if (totalSupply > 12) {
      if (Number(availableBalance) < publicNFTPrice) {
        notify('error', 'Insufficient Balance to mint NFT.')
        return
      }
      try {
        const tx = await wildNFTContract.mint(address, {
          from: address,
          value: fromReadableAmount(publicNFTPrice),
        })
        await tx.wait()
        notify('success', 'You minted NFT successfully')
        notify('info', 'Now you can buy WILD token from presale page')
      } catch (error) {
        if (didUserReject(error)) {
          notify('warning', 'User Rejected transaction')
          return
        } else {
          notify('warning', 'Please check your network status or balance')
          return
        }
      }
    } else {
      const isWhiteListed = await wildNFTContract.isWhiteListed(address)
      console.log(isWhiteListed)
      if (!isWhiteListed) {
        notify('error', 'You are not whitelisted. Please contact Support')
        return
      }
      if (Number(availableBalance) < privateNFTPrice) {
        notify('error', 'Insufficient Balance to mint NFT.')
        return
      }
      try {
        const tx = await wildNFTContract.mint(address, {
          from: address,
          value: fromReadableAmount(privateNFTPrice),
        })
        await tx.wait()
        notify('success', 'You minted NFT successfully')
        notify('info', 'Now you can buy WILD token from presale page')
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
  }

  useEffect(() => {
    if (
      chain &&
      (chain.id === CHAIN_ID || chain.id === TESTNET_CHAIN_ID) &&
      address &&
      signer
    ) {
      getTotalSupply()
      getMyNFT()
    }
  }, [address, signer, chain])

  return (
    <div className='flex justify-center flex-col  items-center'>
      <div>
        {owned ? (
          <a
            href='/presale'
            className='text-3xl font-bold bg-gray-900 py-1 px-4 rounded-md hover:text-gray-400'
          >
            Buy WILD
          </a>
        ) : (
          <button
            className='text-3xl font-bold bg-gray-900 py-1 px-4 rounded-md hover:text-gray-400'
            onClick={() => mintNFT()}
          >
            MINT NFT
          </button>
        )}
      </div>
      <div className='text-3xl mt-3'>
        {totalSupply > 12 ? totalSupply : `${Number(totalSupply)} / 12`}
      </div>
    </div>
  )
}
