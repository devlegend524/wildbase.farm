import { EXPLORER_URL } from 'config/constants'
import { CHAIN_ID } from 'config/config'

export const getScanUrl = (value, type = "address") => {
  const prefixByType = {
    address: 'address',
    token: 'token',
    tx: 'tx',
    block: 'block',
    blockCountdown: 'block/countdown',
  }

  const prefix = prefixByType[type]
  return `${EXPLORER_URL[CHAIN_ID]}/${prefix}/${value}`
}

export const getScanAddressUrl = (address) => getScanUrl(address)
export const getScanTransactionUrl = (hash) => getScanUrl(hash, 'tx')
export const getScanBlockNumberUrl = (block) => getScanUrl(block, 'block')
export const getScanBlockCountdownUrl = (block) => getScanUrl(block, 'blockCountdown')
export const getScanTokenUrl = (address) => getScanUrl(address, 'token')
