import React, { useEffect } from 'react'
import { useWildNFT } from 'hooks/useContract'
export default function MintNFT() {
  const wildNFTContract = useWildNFT()
  const totalSupply = async () => {
    console.log(await wildNFTContract.totalSupply())
  }
  useEffect(() => {
    totalSupply()
  }, [])
  return (
    <div className='flex justify-center flex-col  items-center'>
      <div>
        <button className='text-3xl font-bold bg-gray-900 py-1 px-4 rounded-md hover:text-gray-400'>
          MINT NFT
        </button>
      </div>
      <div className='text-3xl mt-3'>0 /12</div>
    </div>
  )
}
