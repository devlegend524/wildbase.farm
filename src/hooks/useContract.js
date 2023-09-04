import { useMemo } from 'react'
import { useEthersProvider, useEthersSigner } from 'hooks/useEthers'
import { getBep20Contract, getWILDContract, getMasterchefContract, getErc721Contract, getPresaleContract, getWildNFTContract } from 'utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useERC20 = (address) => {
  const provider = useEthersProvider()
  return useMemo(() => getBep20Contract(address, provider), [address, provider])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address) => {
  const provider = useEthersProvider()
  return useMemo(() => getErc721Contract(address, provider), [address, provider])
}

export const useWILD = () => {
  const provider = useEthersProvider()
  return useMemo(() => getWILDContract(provider), [provider])
}

export const useMasterchef = () => {
  const provider = useEthersProvider()
  return useMemo(() => getMasterchefContract(provider), [provider])
}

export const usePresaleContract = () => {
  const signer = useEthersSigner()
  return useMemo(() => getPresaleContract(signer), [signer])
}
export const useWildNFT = () => {
  const signer = useEthersSigner()
  return useMemo(() => getWildNFTContract(signer), [signer])
}