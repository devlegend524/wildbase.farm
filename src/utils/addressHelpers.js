import { contractAddresses } from 'config/constants'
import tokens from 'config/tokens'

export const getWILDAddress = () => {
  return tokens.wild.address
}
export const getMasterChefAddress = () => {
  return contractAddresses.masterChef
}
export const getMulticallAddress = () => {
  return contractAddresses.multiCall
}
export const getWethAddress = () => {
  return tokens.weth.address
}
export const getNFTAddress = () => {
  return contractAddresses.wildNFT
}
export const getPresaleAddress = () => {
  return contractAddresses.presaleContract
}
