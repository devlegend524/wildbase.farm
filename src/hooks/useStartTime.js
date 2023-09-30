import { useEffect, useState } from 'react'
import { useMasterchef } from './useContract'
import useRefresh from './useRefresh'

const useStartTime = () => {
  const masterChefContract = useMasterchef()
  const { fastRefresh } = useRefresh()
  const [loading, setLoading] = useState < boolean > (false)
  const [data, setData] = useState < number > (0)

  useEffect(() => {
    const fetchStartTime = async () => {
      try {
        setLoading(true)
        const startTime = await masterChefContract.startTime()
        setData(startTime * 1000)
      } catch (e) {
        console.log('fetch start time error', e)
      } finally {
        setLoading(false)
      }
    }

    fetchStartTime()
  }, [masterChefContract, fastRefresh])

  return {
    data,
    loading,
  }
}

export default useStartTime
