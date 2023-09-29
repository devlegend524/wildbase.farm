import React, { useEffect, useState } from 'react'
import CardValue from './CardValue'
import { getWILDXContract } from 'utils/contractHelpers'
import { useEthersProvider } from 'hooks/useEthers'
import { useAccount } from 'wagmi'

export default function CurrentSaleTax() {
    const [taxRate, setTaxRate] = useState(0)
    const address = useAccount()
    const provider = useEthersProvider()
    const getCurrentTaxRate = async () => {
        const wildxContract = getWILDXContract(provider)
        const currentRate = await wildxContract.getCurrentTaxRate();
        setTaxRate(Number(currentRate) / 100)
    }
    useEffect(() => {
        if (provider) getCurrentTaxRate()
    }, [provider])
    return (
        <CardValue
            value={taxRate}
            color='#fff'
            lineHeight='36px'
        />
    )
}
