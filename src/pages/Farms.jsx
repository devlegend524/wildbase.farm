import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import BigNumber from 'bignumber.js'
import FarmBanner from 'components/FarmBanner'
import FramsStaking from 'components/FarmsStaking'
import TotalValueLocked from 'components/TotalValueLocked'
import FarmControls from 'components/FarmControls'
import FarmTables from 'components/FarmTables'
import { getSortOptions, DesktopColumnSchema } from 'config/constants'
import { useLocation } from 'react-router-dom'
import { orderBy } from 'lodash'
import { latinise } from 'utils/latinise'
import { getFarmApr } from 'utils/getApr'
import { getBalanceNumber } from 'utils/formatBalance'
import isArchivedPid from 'utils/farmHelpers'
import { useWILDPerSecond } from 'hooks/useTokenBalance'
import { CHAIN_ID, NUMBER_OF_FARMS_VISIBLE } from 'config/config'
import { useFarms, usePollFarmsData, usePriceWILDUsdc } from 'state/hooks'
import { useAccount } from 'wagmi'

export default function Farms() {
  const { pathname } = useLocation()
  const { address } = useAccount()
  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived
  usePollFarmsData(isArchived)

  const wildPrice = usePriceWILDUsdc()
  const loadMoreRef = useRef()

  const [userDataReady, setUserDataReady] = useState('hot')
  const [sortOption, setSortOption] = useState('hot')
  const [stakedOnly, setStakedOnly] = useState(!isActive)
  const [query, setQuery] = useState('')
  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(
    NUMBER_OF_FARMS_VISIBLE
  )
  const [observerIsSet, setObserverIsSet] = useState(false)
  const wildPerSecond = getBalanceNumber(useWILDPerSecond())

  const { data: farmsData, userDataLoaded } = useFarms()

  useEffect(() => {
    setUserDataReady(address || (address && userDataLoaded))
  }, [address, userDataLoaded])

  const farmsLP = farmsData.map((farm) => ({
    ...farm,
    userData: {
      allowance: '0',
      tokenBalance: '0',
      stakedBalance: '0',
      earnings: '0',
      unlockTime: 0,
    },
  }))

  const handleSortOptionChange = (option) => {
    setSortOption(option.value)
  }
  const handleChangeQuery = (event) => {
    setQuery(event.target.value)
  }
  const activeFarms = farmsLP.filter(
    (farm) =>
      (farm.pid || farm.pid === 0) &&
      farm.multiplier !== '0X' &&
      !isArchivedPid(farm.pid)
  )

  const upcomingFarms = farmsLP.filter(
    (farm) => typeof farm.pid === 'undefined'
  )

  const inactiveFarms = farmsLP.filter(
    (farm) =>
      farm.pid !== 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid)
  )

  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  const stakedOnlyFarms = activeFarms.filter(
    (farm) =>
      farm.userData &&
      new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) =>
      farm.userData &&
      new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) =>
      farm.userData &&
      new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)
  )

  const farmsList = useCallback(
    (farmsToDisplay) => {
      let farmsToDisplayWithAPR = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteToken.usdcPrice) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(
          farm.quoteToken.usdcPrice
        )

        const apr = isActive
          ? getFarmApr(
              new BigNumber(farm.poolWeight),
              wildPrice,
              totalLiquidity,
              farm.lpAddresses[CHAIN_ID],
              wildPerSecond
            )
          : 0

        return { ...farm, apr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [wildPrice, query, isActive, wildPerSecond]
  )

  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])

  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []

    const sortFarms = (farms) => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm) => farm.apr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm) =>
              farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0,
            'desc'
          )
        case 'earned':
          return orderBy(
            farms,
            (farm) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc'
          )
        case 'liquidity':
          return orderBy(farms, (farm) => Number(farm.liquidity), 'desc')
        case 'depositFee':
          return orderBy(farms, (farm) => Number(farm.depositFee), 'asc')
        default:
          return farms
      }
    }

    if (isActive) {
      farmsStaked = stakedOnly
        ? farmsList(stakedOnlyFarms)
        : farmsList([...upcomingFarms, ...activeFarms])
    }
    if (isInactive) {
      farmsStaked = stakedOnly
        ? farmsList(stakedInactiveFarms)
        : farmsList(inactiveFarms)
    }
    if (isArchived) {
      farmsStaked = stakedOnly
        ? farmsList(stakedArchivedFarms)
        : farmsList(archivedFarms)
    }

    return sortFarms(farmsStaked).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    upcomingFarms,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible(
          (farmsCurrentlyVisible) =>
            farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE
        )
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [farmsStakedMemoized, observerIsSet])

  const rowData = farmsStakedMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol

    const row = {
      apr: {
        value:
          farm.apr &&
          farm.apr.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        wildPrice,
        originalValue: farm.apr,
      },
      farm: {
        depositFee: farm.depositFee,
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
        isTokenOnly: farm.isTokenOnly,
        hasDiscount: false,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = () => {
    if (rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a, b) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return (
                  Number(a.original.apr.value) - Number(b.original.apr.value)
                )
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return (
        <FarmTables
          data={rowData}
          columns={columns}
          userDataReady={userDataReady}
          account={address}
        />
      )
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='container m-3'>
        <FarmBanner />
        <div className='flex gap-5 flex-col md:flex-row mt-5'>
          <FramsStaking />
          <TotalValueLocked />
        </div>
        <FarmControls
          options={getSortOptions()}
          onChange={handleSortOptionChange}
          checked={stakedOnly}
          onToggleChange={() => setStakedOnly(!stakedOnly)}
          query={query}
          onSearchChange={handleChangeQuery}
        />
        {renderContent()}
        <div ref={loadMoreRef} />
      </div>
    </div>
  )
}
