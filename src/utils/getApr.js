import BigNumber from 'bignumber.js'
import { YEAR_BN } from 'config/config'
import lpAprs from 'config/lpAprs.json'

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
  tokenPerSecond,
) => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerSecond).times(YEAR_BN)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param wildPriceUsd WILD price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApr = (
  poolWeight,
  wildPriceUsd,
  poolLiquidityUsd,
  farmAddress,
  tokenPerSecond,
) => {
  const wildPerYear = YEAR_BN.times(tokenPerSecond)
  const yearlyWILDRewardAllocation = wildPerYear.times(poolWeight)
  const wildRewardsApr = yearlyWILDRewardAllocation.times(wildPriceUsd).div(poolLiquidityUsd).times(100)
  if (wildRewardsApr.isNaN() || !wildRewardsApr.isFinite()) {
    return null
  }
  const lpRewardsApr = lpAprs[farmAddress.toLocaleLowerCase()] ?? 0
  const combinedApr = wildRewardsApr.plus(lpRewardsApr)
  return combinedApr.toNumber()
}

export default null
