import { contractAddresses } from 'config/constants'
import tokens from 'config/tokens'
import { CHAIN_ID } from 'config/config'

export const getAddress = (address, chainId) => {
  return address[chainId ? chainId : CHAIN_ID]
}

export const getWILDAddress = (chainId) => {
  const address = getAddress(tokens.wild.address, chainId)
  return address
}
export const getMasterChefAddress = (chainId) => {
  return getAddress(contractAddresses.masterChef, chainId)
}
export const getMulticallAddress = (chainId) => {
  return getAddress(contractAddresses.multiCall, chainId)
}
export const getWethAddress = (chainId) => {
  return getAddress(tokens.weth.address, chainId)
}
export const getNFTAddress = (chainId) => {
  return getAddress(contractAddresses.wildNFT, chainId)
}
export const getPresaleAddress = (chainId) => {
  return getAddress(contractAddresses.presaleContract, chainId)
}
