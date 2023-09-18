import { useMemo } from 'react'
import { useEthersProvider, useEthersSigner } from 'hooks/useEthers'
import { getErc20Contract, getWILDXContract, getMasterchefContract, getZapContract } from 'utils/contractHelpers'
import { useNetwork } from 'wagmi'
import { CHAIN_ID } from 'config/config'
/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useERC20 = (address) => {
  const signer = useEthersSigner()
  return useMemo(() => getErc20Contract(address, signer), [address, signer])
}

export const useWILDX = () => {
  const provider = useEthersProvider()
  const { chain } = useNetwork()
  return useMemo(() => chain &&
    (chain.id === CHAIN_ID) && getWILDXContract(provider, chain?.id), [provider, chain])
}

export const useMasterchef = () => {
  const signer = useEthersSigner()
  const { chain } = useNetwork()
  return useMemo(() => chain &&
    (chain.id === CHAIN_ID) && getMasterchefContract(signer, chain?.id), [signer, chain])
}

export const useZapContract = () => {
  const signer = useEthersSigner()
  const { chain } = useNetwork()
  return useMemo(() => chain &&
    (chain.id === CHAIN_ID) && getZapContract(signer, chain?.id), [signer, chain])
}
