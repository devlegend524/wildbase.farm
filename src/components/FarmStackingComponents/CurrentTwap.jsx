import React, { useState, useEffect } from 'react'
import CardValue from './CardValue'
import { getOracleContract } from 'utils/contractHelpers'
import { useEthersProvider } from 'hooks/useEthers'
import { getWILDXAddress } from 'utils/addressHelpers'
import { fromReadableAmount } from 'utils/customHelpers'
import { usePriceEthUsdc } from 'state/hooks'
export default function CurrentTwap() {
    const [twap, setTwap] = useState(0)
    const provider = useEthersProvider()
    const ethPrice = usePriceEthUsdc();
    const getCurrentTwap = async () => {
        const oracleContract = getOracleContract(provider)
        const currentRate = await oracleContract.twap(getWILDXAddress(), fromReadableAmount(1, 18));
        setTwap(Number(currentRate) * Number(ethPrice) / Math.pow(10, 18))
    }
    useEffect(() => {
        if (provider) {
            getCurrentTwap()
        }
    }, [provider])
    return (
        <CardValue
            value={2.5}
            color='#fff'
            lineHeight='36px'
        />
    )
}
