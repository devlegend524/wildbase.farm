import { useCallback } from 'react'
import { harvest } from 'utils/callHelpers'
import { useMasterchef } from './useContract'
import { useAccount } from 'wagmi'

export const useHarvest = (farmPid) => {
  const { address } = useAccount()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async (isCompound) => {
    return await harvest(masterChefContract, farmPid, isCompound, address)
  }, [address, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

