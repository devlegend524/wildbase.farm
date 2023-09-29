import { contractAddresses } from 'config/constants'
import tokens from 'config/tokens'

export const getWILDXAddress = () => {
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
export const getZapAddress = () => {
  return contractAddresses.zap
}
export const getOracleAddress = () => {
  return contractAddresses.oracle
}