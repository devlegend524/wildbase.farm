import { Interface } from '@ethersproject/abi'
import { getMulticallContract } from 'utils/contractHelpers'
import web3NoAccount from 'utils/providerHelpers'
import { CHAIN_ID } from 'config/config'
import MultiCallAbi from 'config/abi/Multicall.json'

// Addresses
import {
  getMulticallAddress,
} from 'utils/addressHelpers'

const multicall = async (abi, calls, options) => {
  try {
    const _web3 = options?.web3 ?? web3NoAccount
    const multi = new _web3.eth.Contract(MultiCallAbi, getMulticallAddress())
    const itf = new Interface(abi)
    const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])

    const { returnData } = await multi.methods.aggregate(calldata).call(undefined, options?.blockNumber)
    const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

    return res
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return inclues a boolean whether the call was successful e.g. [wasSuccessfull, callResult]
 */
export const multicallv2 = async (abi, calls, options) => {
  const multi = getMulticallContract(web3NoAccount, CHAIN_ID)
  const itf = new Interface(abi)

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const returnData = await multi
    .tryAggregate(options.requireSuccess === undefined ? true : options.requireSuccess, calldata)
    .call(undefined, options.blockNumber)
  const res = returnData.map((call, i) => {
    const [result, data] = call
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null
  })

  return res
}

export default multicall
