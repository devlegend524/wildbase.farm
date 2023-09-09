import random from 'lodash/random'

// Array of available nodes to connect to
export const nodes = ['https://base.publicnode.com', 'https://1rpc.io/base', 'https://base-mainnet.diamondswap.org/rpc']

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default getNodeUrl
