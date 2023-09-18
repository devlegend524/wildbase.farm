import BigNumber from 'bignumber.js'
import { CHAIN_ID, wildWethFarmPid } from 'config/config'
import { ethers } from 'ethers'
import { Pair, TokenAmount, Token } from '@pancakeswap-libs/sdk'
import { getLpContract, getMasterchefContract } from 'utils/contractHelpers'
import farms from 'config/farms'
import { getWILDXAddress } from 'utils/addressHelpers'
import { getBalanceAmount } from './formatBalance'
import { BIG_ZERO } from './bigNumber'
import { web3WithArchivedNodeProvider } from './providerHelpers'
import { fromReadableAmount } from './customHelpers'
import tokens from 'config/tokens'


export const approve = async (lpContract, masterChefContract, address) => {
  return lpContract.approve(masterChefContract.address, ethers.constants.MaxUint256, { from: address }
  )
}


export const stake = async (
  masterChefContract,
  pid,
  amount,
  decimals = 18,
) => {
  try {
    return await masterChefContract
      .deposit(pid, fromReadableAmount(amount, decimals))
  } catch (e) {
    console.log(e)
    return null
  }

}

export const unstake = async (masterChefContract, pid, amount, address, decimals = 18) => {
  try {
    return await masterChefContract
      .withdraw(pid, fromReadableAmount(amount, decimals), { from: address })
  } catch (e) {
    console.log(e)
    return null
  }
}
export const zap = async (zapContract, tokenA, amount, tokenB, address) => {
  try {
    console.log(tokenA, amount.toString(), tokenB)
    return await zapContract
      .zap(tokenA, amount, tokenB, { from: address })
  } catch (e) {
    console.log(e)
    return null
  }
}


export const harvest = async (masterChefContract, pid, address) => {
  try {
    return await masterChefContract
      .deposit(pid, '0')
  } catch (e) {
    console.log(e)
    return null
  }
}


const chainId = parseInt(CHAIN_ID, 10)
const wildWethFarm = farms.find((farm) => farm.pid === wildWethFarmPid)

const WILDX_TOKEN = new Token(chainId, getWILDXAddress(), 18)
const WETH_TOKEN = new Token(chainId, tokens.weth.address, 18)
const WILDX_WETH_TOKEN = new Token(chainId, wildWethFarm.lpAddresses, 18)

/**
 * Returns the total WILDX staked in the WILDX-BNB LP
 */
export const getUserStakeInWildWethLp = async (account, block) => {
  try {
    const masterContract = getMasterchefContract(web3WithArchivedNodeProvider, CHAIN_ID)
    const wildWethContract = getLpContract(wildWethFarm.lpAddresses, web3WithArchivedNodeProvider)
    const totalSupplyLP = await wildWethContract.totalSupply().call(undefined, block)
    const reservesLP = await wildWethContract.getReserves().call(undefined, block)
    const wildWethBalance = await masterContract.userInfo(wildWethFarm, account).call(undefined, block)

    const pair = new Pair(
      new TokenAmount(WILDX_TOKEN, reservesLP._reserve0.toString()),
      new TokenAmount(WETH_TOKEN, reservesLP._reserve1.toString()),
    )
    const cakeLPBalance = pair.getLiquidityValue(
      pair.token0,
      new TokenAmount(WILDX_WETH_TOKEN, totalSupplyLP.toString()),
      new TokenAmount(WILDX_WETH_TOKEN, wildWethBalance.amount.toString()),
      false,
    )

    return new BigNumber(cakeLPBalance.toSignificant(18))
  } catch (error) {
    console.error(`WILDX-BNB LP error: ${error}`)
    return BIG_ZERO
  }
}

/**
 * Gets the wild staked in the main pool
 */
export const getUserStakeInWILDXPool = async (account, block) => {
  try {

    const masterContract = getMasterchefContract(web3WithArchivedNodeProvider, CHAIN_ID)
    const response = await masterContract.userInfo(0, account).call(undefined, block)

    return getBalanceAmount(new BigNumber(response.amount))
  } catch (error) {
    console.error('Error getting stake in WILDX pool', error)
    return BIG_ZERO
  }
}
