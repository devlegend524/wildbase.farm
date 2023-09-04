import { ethers } from 'ethers'
// Addresses
import {
  getWILDAddress,
  getMasterChefAddress,
  getMulticallAddress,
  getPresaleAddress,
  getNFTAddress,
} from 'utils/addressHelpers'

// ABI
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import wildAbi from 'config/abi/wild.json'
import masterChef from 'config/abi/masterchef.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import presaleAbi from 'config/abi/presale.json'
import wildNFTAbi from 'config/abi/wildNFT.json'
import { DEFAULT_GAS_PRICE } from 'config/config'
// import { getSettings, getGasPriceInWei } from './settings'

export const getDefaultGasPrice = () => {
  return DEFAULT_GAS_PRICE
}

const getContract = (abi, address, provider) => {
  return new ethers.Contract(address, abi, provider)
}

export const getBep20Contract = (address, provider) => {
  return getContract(bep20Abi, address, provider)
}
export const getErc721Contract = (address, provider) => {
  return getContract(erc721Abi, address, provider)
}
export const getLpContract = (address, provider) => {
  return getContract(lpTokenAbi, address, provider)
}
export const getWILDContract = (provider) => {
  return getContract(wildAbi, getWILDAddress(), provider)
}
export const getMasterchefContract = (provider) => {
  return getContract(masterChef, getMasterChefAddress(), provider)
}
export const getMulticallContract = (provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), provider)
}

export const getWildNFTContract = (provider) => {
  return getContract(wildNFTAbi, getNFTAddress(), provider)
}
export const getPresaleContract = (provider) => {
  return getContract(presaleAbi, getPresaleAddress(), provider)
}
