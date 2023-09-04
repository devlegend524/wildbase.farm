import { contractAddresses } from 'config/constants'
import tokens from 'config/tokens'
import { CHAIN_ID } from 'config/config'

export const getAddress = (address) => {
  return address[CHAIN_ID]
}

export const getWILDAddress = () => {
  const address = getAddress(tokens.wild.address)
  return address
}
export const getMasterChefAddress = () => {
  return getAddress(contractAddresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(contractAddresses.multiCall)
}
export const getWethAddress = () => {
  return getAddress(tokens.weth.address)
}
export const getNFTAddress = () => {
  return getAddress(contractAddresses.wildNFT)
}
export const getPresaleAddress = () => {
  return getAddress(contractAddresses.presaleContract)
}
