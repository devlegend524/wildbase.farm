import { useCallback } from 'react'
import { useFarmFromPid } from 'state/hooks'
import { stake } from 'utils/callHelpers'
import { BIG_TEN } from 'utils/bigNumber'
import { useMasterchef, useSousChef } from './useContract'
import { useAccount } from 'wagmi'

const useStake = (pid) => {
  const { address } = useAccount()
  const masterChefContract = useMasterchef()
  const farm = useFarmFromPid(pid)

  const tokenDecimals = farm.isTokenOnly ? farm.token.decimals : 18

  const handleStake = useCallback(
    async (amount, lockPeriod = 0) => {
      // const whitelistMerkleTree = StandardMerkleTree.of(
      //   merkleTree.values.map((item) => item.value),
      //   merkleTree.leafEncoding,
      // )
      const proof = []
      // try {
      //   proof = whitelistMerkleTree.getProof([account])
      // } catch (e) {
      //   console.error('Whitelist check error', e)
      // }
      const txHash = await stake(
        masterChefContract,
        pid,
        amount,
        lockPeriod,
        proof,
        address,
        BIG_TEN.pow(tokenDecimals),
      )
      console.info(txHash)
    },
    [address, masterChefContract, pid, tokenDecimals],
  )

  return { onStake: handleStake }
}

export default useStake
