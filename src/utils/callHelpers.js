import BigNumber from 'bignumber.js'
import { CHAIN_ID, DEFAULT_TOKEN_DECIMAL } from 'config/config'
import { ethers } from 'ethers'
import { Pair, TokenAmount, Token } from '@pancakeswap-libs/sdk'
import { getLpContract, getMasterchefContract } from 'utils/contractHelpers'
import farms from 'config/farms'
import { getAddress, getWILDAddress } from 'utils/addressHelpers'
import tokens from 'config/tokens'
import { getBalanceAmount } from './formatBalance'
import { BIG_TEN, BIG_ZERO } from './bigNumber'
import { web3WithArchivedNodeProvider } from './providerHelpers'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.approve(masterChefContract.address, ethers.constants.MaxUint256, { from: account }
  )
}

const txHashCallback = (tx) => tx.transactionHash

export const stake = async (
  masterChefContract,
  pid,
  amount,
  lockPeriod,
  proof,
  account,
  decimals = DEFAULT_TOKEN_DECIMAL,
) => {
  return masterChefContract
    .deposit(pid, new BigNumber(amount).times(decimals).toString(), lockPeriod, proof)
    .on('transactionHash', txHashCallback)
}

export const unstake = async (masterChefContract, pid, amount, account, decimals = DEFAULT_TOKEN_DECIMAL) => {
  return masterChefContract
    .withdraw(pid, new BigNumber(amount).times(decimals).toString())
    .on('transactionHash', txHashCallback)
}


export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract
    .deposit(pid, '0', 0, [])
    .on('transactionHash', txHashCallback)
}


const chainId = parseInt(CHAIN_ID, 10)
const wildWethPid = 0
const wildWethFarm = farms.find((farm) => farm.pid === wildWethPid)

const WILD_TOKEN = new Token(chainId, getWILDAddress(), 18)
const WETH_TOKEN = new Token(chainId, tokens.weth.address[chainId], 18)
const WILD_WETH_TOKEN = new Token(chainId, getAddress(wildWethFarm.lpAddresses), 18)

/**
 * Returns the total WILD staked in the WILD-BNB LP
 */
export const getUserStakeInWildWethLp = async (account, block) => {
  try {
    const masterContract = getMasterchefContract(web3WithArchivedNodeProvider, CHAIN_ID)
    const wildWethContract = getLpContract(getAddress(wildWethFarm.lpAddresses), web3WithArchivedNodeProvider)
    const totalSupplyLP = await wildWethContract.totalSupply().call(undefined, block)
    const reservesLP = await wildWethContract.getReserves().call(undefined, block)
    const wildWethBalance = await masterContract.userInfo(wildWethFarm, account).call(undefined, block)

    const pair = new Pair(
      new TokenAmount(WILD_TOKEN, reservesLP._reserve0.toString()),
      new TokenAmount(WETH_TOKEN, reservesLP._reserve1.toString()),
    )
    const cakeLPBalance = pair.getLiquidityValue(
      pair.token0,
      new TokenAmount(WILD_WETH_TOKEN, totalSupplyLP.toString()),
      new TokenAmount(WILD_WETH_TOKEN, wildWethBalance.amount.toString()),
      false,
    )

    return new BigNumber(cakeLPBalance.toSignificant(18))
  } catch (error) {
    console.error(`WILD-BNB LP error: ${error}`)
    return BIG_ZERO
  }
}

/**
 * Gets the wild staked in the main pool
 */
export const getUserStakeInWILDPool = async (account, block) => {
  try {

    const masterContract = getMasterchefContract(web3WithArchivedNodeProvider, CHAIN_ID)
    const response = await masterContract.userInfo(0, account).call(undefined, block)

    return getBalanceAmount(new BigNumber(response.amount))
  } catch (error) {
    console.error('Error getting stake in WILD pool', error)
    return BIG_ZERO
  }
}
