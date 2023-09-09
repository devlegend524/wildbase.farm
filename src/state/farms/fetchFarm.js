import fetchPublicFarmData from 'state/farms/fetchPublicFarmData'

const fetchFarm = async (farm) => {
  const farmPublicData = await fetchPublicFarmData(farm)

  return { ...farm, ...farmPublicData }
}

export default fetchFarm
