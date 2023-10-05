import { useCallback } from 'react'
import { zap, zapForFarm } from 'utils/callHelpers'
import { useZapContract } from './useContract'
import { useAccount } from 'wagmi'

const useZap = () => {
  const { address } = useAccount()
  const zapContract = useZapContract()

  const handleZap = useCallback(
    async (tokenA, isNative, amount, tokenB, isOutNative) => {
      await zap(zapContract, tokenA, isNative, amount, tokenB, isOutNative, address)
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
      await zapForFarm(zapContract, tokenA, isNative, amount, tokenB, pid, address)
    },
    [address, zapContract],
  )

  return { onZapForFarm: handleZap }
}

export default useZap
