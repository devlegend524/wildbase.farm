import fetchFarm from './fetchFarm'

const fetchFarms = async (farmsToFetch) => {
  const data = await Promise.all(
    farmsToFetch.map(async (farmConfig) => {
      try {
        const farm = await fetchFarm(farmConfig)
        return farm
      } catch (e) {
        console.log("could not fetch farm", farmConfig.pid, e)
        throw e
      }
    }),
  )
  return data
}

export default fetchFarms
