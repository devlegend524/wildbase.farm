import Web3 from 'web3'
import { ARCHIVED_NODE } from 'config/config'
import getRpcUrl from 'utils/getRpcUrl'

const RPC_URL = getRpcUrl()

const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 })
const web3NoAccount = new Web3(httpProvider)

const archivedHttpProvider = new Web3.providers.HttpProvider(ARCHIVED_NODE, { timeout: 10000 })
export const web3WithArchivedNodeProvider = new Web3(archivedHttpProvider)

export default web3NoAccount
