import { useCallback } from 'react'
import { zap, zapForFarm } from 'utils/callHelpers'
import { useZapContract } from './useContract'
import { useAccount } from 'wagmi'

const useZap = () => {
  const { address } = useAccount()
  const zapContract = useZapContract()

  const handleZap = useCallback(
    async (tokenA, isNative, amount, tokenB, isOutNative) => {
      const txHash = await zap(zapContract, tokenA, isNative, amount, tokenB, isOutNative, address)
      if (txHash)
        await txHash.wait()
      else
        throw new Error('Transaction failed')
    },
    [address, zapContract],
  )

  return { onZap: handleZap }
}

export const useZapForFarm = () => {
  const { address } = useAccount()
  const zapContract = useZapContract()

  const handleZap = useCallback(
    async (tokenA, isNative, amount, tokenB, pid) => {
      const txHash = await zapForFarm(zapContract, tokenA, isNative, amount, tokenB, pid, address)
      if (txHash)
        await txHash.wait()
      else
        throw new Error('Transaction failed')
    },
    [address, zapContract],
  )

  return { onZapForFarm: handleZap }
}

export default useZap
