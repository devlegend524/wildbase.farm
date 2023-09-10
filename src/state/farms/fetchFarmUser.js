import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'

export const fetchFarmUserAllowances = async (account, farmsToFetch) => {
  const masterChefAddress = getMasterChefAddress()
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = farm.isTokenOnly ? farm.token.address : farm.lpAddresses
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account, farmsToFetch) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = farm.isTokenOnly ? farm.token.address : farm.lpAddresses
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (
  account,
  farmsToFetch,
) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return {
      balance: new BigNumber(stakedBalance[0]._hex).toJSON(),
      unlockTime: parseInt(new BigNumber(stakedBalance.unlockTime._hex).toJSON()) * 1000,
    }
  })

  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account, farmsToFetch) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'pendingTokens',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
