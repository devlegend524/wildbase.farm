import { useCallback } from 'react'
import { unstake } from 'utils/callHelpers'
import { useFarmFromPid } from 'state/hooks'
import { useMasterchef } from './useContract'
import { useAccount } from 'wagmi'
const useUnstake = (pid) => {
  const { address } = useAccount()
  const masterChefContract = useMasterchef()
  const farm = useFarmFromPid(pid)

  const tokenDecimals = farm.isTokenOnly ? farm.token.decimals : 18

  const handleUnstake = useCallback(
    async (amount) => {
      const txHash = await unstake(masterChefContract, pid, amount, address, tokenDecimals)
      if (txHash)
        await txHash.wait()
    },
    [address, masterChefContract, pid, tokenDecimals],
  )

  return { onUnstake: handleUnstake }
}


export default useUnstake
