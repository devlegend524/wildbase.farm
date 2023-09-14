import BigNumber from 'bignumber.js'
import { YEAR_BN } from 'config/config'

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
  stakingTokenPrice,
  rewardTokenPrice,
  totalStaked,
  tokenPerBlock,
) => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(YEAR_BN)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param wildPriceUsd WILDX price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApr = (
  poolWeight,
  wildPriceUsd,
  poolLiquidityUsd,
  tokenPerBlock,
) => {
  const wildPerYear = YEAR_BN.times(tokenPerBlock)
  const yearlyWILDXRewardAllocation = wildPerYear.times(poolWeight)
  const wildRewardsApr = yearlyWILDXRewardAllocation.times(wildPriceUsd).div(poolLiquidityUsd).times(100)
  if (wildRewardsApr.isNaN() || !wildRewardsApr.isFinite()) {
    return null
  }
  const combinedApr = wildRewardsApr
  return combinedApr.toNumber()
}

export default null
