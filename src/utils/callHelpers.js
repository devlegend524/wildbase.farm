import BigNumber from 'bignumber.js'
import { CHAIN_ID, wildWethFarmPid } from 'config/config'
import { ethers } from 'ethers'
import { Pair, TokenAmount, Token } from '@pancakeswap-libs/sdk'
import { getLpContract, getMasterchefContract } from 'utils/contractHelpers'
import farms from 'config/farms'
import { getWILDXAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { getBalanceAmount } from './formatBalance'
import { BIG_ZERO } from './bigNumber'
import { web3WithArchivedNodeProvider } from './providerHelpers'
import { didUserReject, fromReadableAmount } from './customHelpers'
import tokens from 'config/tokens'
import { notify } from './toastHelper'


export const approve = async (lpContract, masterChefContract, address) => {
  return await lpContract.approve(masterChefContract.address, ethers.constants.MaxUint256, { from: address }
  )
}

export const stake = async (
  masterChefContract,
  pid,
  amount,
  decimals = 18,
  isCompound
) => {
  try {
    const tx = await masterChefContract
      .deposit(pid, fromReadableAmount(amount, decimals), isCompound)
    await tx.wait()
    notify('success', 'Transaction successful!')

  } catch (e) {
    console.log(e)
    if (didUserReject(e)) {
      notify('error', 'User rejected transaction')
    }
    return null
  }

}

export const unstake = async (masterChefContract, pid, amount, address, decimals = 18) => {
  try {
    const tx = await masterChefContract
      .withdraw(pid, fromReadableAmount(amount, decimals), { from: address })
    await tx.wait()
    notify('success', 'Transaction successful!')

  } catch (e) {
    console.log(e)
    if (didUserReject(e)) {
      notify('error', 'User rejected transaction')
    }
    return null
  }
}

export const zap = async (zapContract, tokenA, isNative, amount, tokenB, isOutNative, address) => {
  try {
    if (isNative) {
      const tx = await zapContract
        .zapETH(tokenB, { from: address, value: amount })
      await tx.wait()
      notify('success', 'Zap successful!')
    } else {
      const tx = await zapContract
        .zap(tokenA, amount, tokenB, isOutNative, { from: address })
      await tx.wait()
      notify('success', 'Zap successful!')
    }

  } catch (e) {
    console.log(e)
    if (didUserReject(e)) {
      notify('error', 'User rejected transaction')
    }
    return null
  }
}

export const zapForFarm = async (zapContract, tokenA, isNative, amount, tokenB, pid, address) => {
  try {
    const masterchefAddress = getMasterChefAddress()
    if (isNative) {
      const tx = await zapContract
        .zapIntoFarmWithETH(tokenB, masterchefAddress, pid, { from: address, value: amount })
      await tx.wait()
      notify('success', 'Transaction successful!')
    } else {
      const tx = await zapContract
        .zapIntoFarmWithToken(tokenA, amount, tokenB, masterchefAddress, pid, false, { from: address })
      await tx.wait()
      return notify('success', 'Transaction successful!')
    }

  } catch (e) {
    console.log(e)
    if (didUserReject(e)) {
      notify('error', 'User rejected transaction')
    }
    return null
  }
}

export const harvest = async (masterChefContract, pid, isCompound, address) => {
  try {
    const tx = await masterChefContract
      .deposit(pid, '0', isCompound)
    await tx.wait()
    notify('success', 'Harvest successful!')
  } catch (e) {
    console.log(e)
    if (didUserReject(e)) {
      notify('error', 'User rejected transaction')
    }
    return null
  }
}

export const harvestMany = async (masterChefContract, pids, isCompound, address) => {
  try {
    const tx = await masterChefContract.harvestMany(pids, isCompound, { from: address })
    await tx.wait();
    notify('success', 'Harvest All successful!')
  } catch (e) {
    console.log(e)
    if (didUserReject(e)) {
      notify('error', 'User rejected transaction')
    }
    return null
  }
}

const chainId = parseInt(CHAIN_ID, 10)
const wildWethFarm = farms.find((farm) => farm.pid === wildWethFarmPid)

const WILDX_TOKEN = new Token(chainId, getWILDXAddress(), 18)
const WETH_TOKEN = new Token(chainId, tokens.weth.address, 18)
const WILDX_WETH_TOKEN = new Token(chainId, wildWethFarm.lpAddresses, 18)

/**
 * Returns the total WILDX staked in the WILDX-WETH LP
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
    console.log(`WILDX-WETH LP error: ${error}`)
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
    console.log('Error getting stake in WILDX pool', error)
    return BIG_ZERO
  }
}
