import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { orderBy } from 'lodash'
import farmsConfig from 'config/farms'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from 'hooks/useRefresh'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import { useEthersProvider } from 'hooks/useEthers'
import {
  fetchFarmsPublicDataAsync,
  // fetchWILDVaultPublicData,
  // fetchWILDVaultUserData,
  // fetchWILDVaultFees,
  setBlock,
} from './actions'
import { fetchFarmUserDataAsync, nonArchivedFarms } from './farms'
import { useAccount } from 'wagmi'
export const usePollFarmsData = (includeArchive = false) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const { address } = useAccount()

  useEffect(() => {
    const farmsToFetch = includeArchive ? farmsConfig : nonArchivedFarms
    const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)

    dispatch(fetchFarmsPublicDataAsync(pids))

    if (address) {
      dispatch(fetchFarmUserDataAsync({ account: address, pids }))
    }
  }, [includeArchive, dispatch, slowRefresh, address])
}

/**
 * Fetches the "core" farm data used globally
 * 0 = WILD-ETH LP
 *
 */
export const usePollCoreFarmData = () => {
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync([0]))
  }, [dispatch, fastRefresh])
}

export const usePollBlockNumber = () => {
  const dispatch = useAppDispatch()
  const provider = useEthersProvider();
  useEffect(() => {
    const interval = setInterval(async () => {
      const blockNumber = await provider.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}

// Farms

export const useFarms = () => {
  const farms = useSelector((state) => state.farms)
  return farms
}

export const useFarmFromPid = (pid) => {
  const farm = useSelector((state) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromLpSymbol = (lpSymbol) => {
  const farm = useSelector((state) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)
  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
  }
}

// Return a farm for a given token symbol. The farm is filtered based on attempting to return a farm with a quote token from an array of preferred quote tokens
export const useFarmFromTokenSymbol = (tokenSymbol, preferredQuoteTokens) => {
  const farms = useSelector((state) => state.farms.data.filter((farm) => farm.token.symbol === tokenSymbol))
  const filteredFarm = filterFarmsByQuoteToken(farms, preferredQuoteTokens)
  return filteredFarm
}

// Return the base token price for a farm, from a given pid
export const useUSDCPriceFromPid = (pid) => {
  const farm = useFarmFromPid(pid)
  return farm && new BigNumber(farm.token.usdcPrice)
}

export const useUSDCPriceFromToken = (tokenSymbol) => {
  const tokenFarm = useFarmFromTokenSymbol(tokenSymbol)
  const tokenPrice = useUSDCPriceFromPid(tokenFarm?.pid)
  return tokenPrice
}

export const useLpTokenPrice = (symbol) => {
  const farm = useFarmFromLpSymbol(symbol)
  const farmTokenPriceInUsd = useUSDCPriceFromPid(farm.pid)

  let lpTokenPrice = BIG_ZERO

  if (farm.isTokenOnly) return farmTokenPriceInUsd

  if (farm.lpTotalSupply && farm.lpTotalInQuoteToken) {
    // Total value of base token in LP
    const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.tokenAmountTotal)
    // Double it to get overall value in LP
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokensOnMC = getBalanceAmount(new BigNumber(farm.lpTokenBalanceMC))
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokensOnMC)
  }

  return lpTokenPrice
}

// Pools

export const useFetchWILDVault = () => {
  // const { account } = useWeb3React()
  // const { fastRefresh } = useRefresh()
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(fetchWILDVaultPublicData())
  // }, [dispatch, fastRefresh])
  // useEffect(() => {
  //   dispatch(fetchWILDVaultUserData({ account }))
  // }, [dispatch, fastRefresh, account])
  // useEffect(() => {
  //   dispatch(fetchWILDVaultFees())
  // }, [dispatch])
}

export const useWILDVault = () => {
  const {
    totalShares: totalSharesAsString,
    pricePerFullShare: pricePerFullShareAsString,
    totalWILDInVault: totalWILDInVaultAsString,
    estimatedWILDBountyReward: estimatedWILDBountyRewardAsString,
    totalPendingWILDHarvest: totalPendingWILDHarvestAsString,
    fees: { performanceFee, callFee, withdrawalFee, withdrawalFeePeriod },
    userData: {
      isLoading,
      userShares: userSharesAsString,
      wildAtLastUserAction: wildAtLastUserActionAsString,
      lastDepositedTime,
      lastUserActionTime,
    },
  } = useSelector((state) => state.pools.wildVault)

  const estimatedWILDBountyReward = useMemo(() => {
    return new BigNumber(estimatedWILDBountyRewardAsString)
  }, [estimatedWILDBountyRewardAsString])

  const totalPendingWILDHarvest = useMemo(() => {
    return new BigNumber(totalPendingWILDHarvestAsString)
  }, [totalPendingWILDHarvestAsString])

  const totalShares = useMemo(() => {
    return new BigNumber(totalSharesAsString)
  }, [totalSharesAsString])

  const pricePerFullShare = useMemo(() => {
    return new BigNumber(pricePerFullShareAsString)
  }, [pricePerFullShareAsString])

  const totalWILDInVault = useMemo(() => {
    return new BigNumber(totalWILDInVaultAsString)
  }, [totalWILDInVaultAsString])

  const userShares = useMemo(() => {
    return new BigNumber(userSharesAsString)
  }, [userSharesAsString])

  const wildAtLastUserAction = useMemo(() => {
    return new BigNumber(wildAtLastUserActionAsString)
  }, [wildAtLastUserActionAsString])

  return {
    totalShares,
    pricePerFullShare,
    totalWILDInVault,
    estimatedWILDBountyReward,
    totalPendingWILDHarvest,
    fees: {
      performanceFee,
      callFee,
      withdrawalFee,
      withdrawalFeePeriod,
    },
    userData: {
      isLoading,
      userShares,
      wildAtLastUserAction,
      lastDepositedTime,
      lastUserActionTime,
    },
  }
}

export const useProfile = () => {
  const { isInitialized, isLoading, data, hasRegistered } = useSelector((state) => state.profile)
  return { profile: data, hasProfile: isInitialized && hasRegistered, isInitialized, isLoading }
}

export const usePriceEthUsdc = () => {
  return new BigNumber(localStorage.getItem('ethPrice'));
}

export const usePriceWILDUsdc = () => {
  const wildEthFarm = useFarmFromPid(3)
  return Number(wildEthFarm.token.usdcPrice) > 0 ? new BigNumber(wildEthFarm.token.usdcPrice) : new BigNumber('0.6');
}

// Block
export const useBlock = () => {
  return useSelector((state) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state) => state.block.initialBlock)
}

// Predictions
export const useIsHistoryPaneOpen = () => {
  return useSelector((state) => state.predictions.isHistoryPaneOpen)
}

export const useIsChartPaneOpen = () => {
  return useSelector((state) => state.predictions.isChartPaneOpen)
}

export const useGetRounds = () => {
  return useSelector((state) => state.predictions.rounds)
}

export const useGetSortedRounds = () => {
  const roundData = useGetRounds()
  return orderBy(Object.values(roundData), ['epoch'], ['asc'])
}

export const useGetCurrentEpoch = () => {
  return useSelector((state) => state.predictions.currentEpoch)
}

export const useGetIntervalBlocks = () => {
  return useSelector((state) => state.predictions.intervalBlocks)
}

export const useGetBufferBlocks = () => {
  return useSelector((state) => state.predictions.bufferBlocks)
}

export const useGetTotalIntervalBlocks = () => {
  const intervalBlocks = useGetIntervalBlocks()
  const bufferBlocks = useGetBufferBlocks()
  return intervalBlocks + bufferBlocks
}

export const useGetRound = (id) => {
  const rounds = useGetRounds()
  return rounds[id]
}

export const useGetCurrentRound = () => {
  const currentEpoch = useGetCurrentEpoch()
  const rounds = useGetSortedRounds()
  return rounds.find((round) => round.epoch === currentEpoch)
}

export const useGetPredictionsStatus = () => {
  return useSelector((state) => state.predictions.status)
}

export const useGetHistoryFilter = () => {
  return useSelector((state) => state.predictions.historyFilter)
}

export const useGetCurrentRoundBlockNumber = () => {
  return useSelector((state) => state.predictions.currentRoundStartBlockNumber)
}

export const useGetMinBetAmount = () => {
  const minBetAmount = useSelector((state) => state.predictions.minBetAmount)
  return useMemo(() => new BigNumber(minBetAmount), [minBetAmount])
}

export const useGetIsFetchingHistory = () => {
  return useSelector((state) => state.predictions.isFetchingHistory)
}

export const useGetHistory = () => {
  return useSelector((state) => state.predictions.history)
}

export const useGetHistoryByAccount = (account) => {
  const bets = useGetHistory()
  return bets ? bets[account] : []
}

export const useGetBetByRoundId = (account, roundId) => {
  const bets = useSelector((state) => state.predictions.bets)

  if (!bets[account]) {
    return null
  }

  if (!bets[account][roundId]) {
    return null
  }

  return bets[account][roundId]
}

export const useGetLastOraclePrice = () => {
  const lastOraclePrice = useSelector((state) => state.predictions.lastOraclePrice)
  return new BigNumber(lastOraclePrice)
}

export const useTotalValue = () => {
  const farms = useFarms()
  const wethPrice = usePriceEthUsdc()
  const wildPrice = usePriceWILDUsdc()
  // console.log(wildPrice.toString())
  let value = new BigNumber(0)
  for (let i = 0; i < farms.data.length; i++) {
    const farm = farms.data[i]
    if (farm.lpTotalInQuoteToken) {
      let val
      if (farm.quoteToken.symbol === 'WETH' && wethPrice) {
        val = wethPrice.times(farm.lpTotalInQuoteToken)
      } else if (farm.quoteToken.symbol === 'WILD') {
        val = wildPrice.times(farm.lpTotalInQuoteToken)
      } else {
        val = farm.lpTotalInQuoteToken
      }
      // console.log("val", val.toString(), farm.pid, farm.lpTotalSupply, farm.lpTotalInQuoteToken, farm.lpSymbol);
      value = value.plus(val)
    }
  }
  // return 1.0
  return parseFloat(value.toString())
}