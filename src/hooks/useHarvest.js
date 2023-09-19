import { useCallback } from 'react'
import { harvest } from 'utils/callHelpers'
import { useMasterchef } from './useContract'
import { useAccount } from 'wagmi'

export const useHarvest = (farmPid) => {
  const { address } = useAccount()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async (isCompound) => {
    const txHash = await harvest(masterChefContract, farmPid, isCompound, address)
    if (txHash)
      return await txHash.wait()
    else
      throw new Error('Transaction failed')
  }, [address, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

