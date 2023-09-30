import { useCallback } from 'react'
import { useFarmFromPid } from 'state/hooks'
import { stake } from 'utils/callHelpers'
import { useMasterchef } from './useContract'
import { useAccount } from 'wagmi'
import { FaLessThanEqual } from 'react-icons/fa'

const useStake = (pid) => {
  const { address } = useAccount()
  const masterChefContract = useMasterchef()
  const farm = useFarmFromPid(pid)

  const tokenDecimals = farm.isTokenOnly ? farm.token.decimals : 18
  const handleStake = useCallback(
    async (amount) => {
      // const whitelistMerkleTree = StandardMerkleTree.of(
      //   merkleTree.values.map((item) => item.value),
      //   merkleTree.leafEncoding,
      // )
      const proof = []
      // try {
      //   proof = whitelistMerkleTree.getProof([account])
      // } catch (e) {
      //  console.log('Whitelist check error', e)
      // }
      const txHash = await stake(
        masterChefContract,
        pid,
        amount,
        tokenDecimals,
        false
      )
      if (txHash)
        await txHash.wait()
      else
        throw new Error('Transaction failed')
    },
    [address, masterChefContract, pid, tokenDecimals],
  )

  return { onStake: handleStake }
}

export default useStake
