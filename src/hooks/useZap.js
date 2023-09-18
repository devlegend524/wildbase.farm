import { useCallback } from 'react'
import { zap } from 'utils/callHelpers'
import { useFarmFromPid } from 'state/hooks'
import { useZapContract } from './useContract'
import { useAccount } from 'wagmi'

const useZap = () => {
  const { address } = useAccount()
  const zapContract = useZapContract()

  const handleZap = useCallback(
    async (tokenA, amount, tokenB) => {
      const txHash = await zap(zapContract, tokenA, amount, tokenB, address)
      if (txHash)
        await txHash.wait()
    },
    [address, zapContract],
  )

  return { onZap: handleZap }
}


export default useZap
