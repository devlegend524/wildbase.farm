Lodge Farm Deployment Guide
1. Deployment Lodge Token.
In Smart contract directory (E:/Tasks/Lodge Capital/ Smart Contract)
run command:
npx hardhat run scripts/mainnet-deployment.ts –network base-mainnet
from deployment console, you can get lodge token contract address and
weth-lodge lp, usdc-lodge lp contract addresses.
(Please copy & paste those three addresses to safe place. Will use it frontend)
2. Deploy MasterChef Contract.
It’s single solidity file, so you can deploy it from remix (much easier).
Deployment arguments.
_WILDX: Lodge token address.
_DEVADDR: dev address to collect dev allocation.
_FEEADDRESS1: fee address
_WILDPERBLOCK: Lodge token emission per block.
(For example 0.5 LODGE per Block: 0.5 * 10**18)
_STARTBLOCK: block number to start farm.
3. Add Farms to MasterChef Contract. (by calling add function from smart
contract)
LODGE (allocPoint 150, fee: 0)
WETH (allocPoint: 100: fee: 300)
DAI (allocPoint: 50L fee:300)
WETH-LODGE (allocPoint: 700: fee: 200)
WETH-USDC(allocPoint: 0: fee:200)
4. Deploy Oracle Contract
It’s single solidity file, so you can deploy it from remix (much easier).Compiler version: 0.6.12
Deployment arguments:
_pair: weth-lodge lp token address,
_startTime: current timestamp
5. Deploy TaxOfficeV5 contract.
It’s single solidity file, so you can deploy it from remix (much easier).
Compiler version: 0.6.12
Enable Optimization: 2000
Deployment arguments:
_mainToken: lodge token address
_shareToken: lodge token address
_mainTokenOracle: oracle address
_router: pancakeswap router address
6. Deploy ZapV2 contract
7. Set Config in Lodge token.
1) Set Tax Office.
2) Set Tax Office, ZapV2, MasterChef contract to white list
3) Mint enough token to treasury address.
4) Set enable dynamic tax before transfer ownership to masterchef contract.
8. Update config and constants, farms, tokens settings in wildbase.farm
frontend.
(need to update token address and abis if updated)
Config/config.js
export const wildWethFarmPid = 6;
export const wethUsdcFarmPid = 4;
config/constants.js
export const contractAddresses = {
masterChef: '0x6Bc0A15299B65F4799F6eCb586467220babBeD35',
//'0x41492B0e514Be20d3a78f1b50f8f2E657591FD42',
multiCall: '0xC48cb0E0f5c9565d99062cAF2DC540313dD280b5',
//'0xC48cb0E0f5c9565d99062cAF2DC540313dD280b5',
zap: '0xC53376D63C13FF7354a4eb2e8b3E212c8240A023',
}
Config/farms.js
import tokens from './tokens'const farmsConfig = [
{
pid: 5,
lpSymbol: tokens.wild.symbol,
isTokenOnly: true,
lpAddresses: '0x17697df2Abb7051B8EB2Cec5065Cb8eE2F0A7B6D',
token: tokens.wild,
quoteToken: tokens.wild,
logoA: '/images/tokens/wildx.svg',
logoB: ''
},
{
pid: 1,
lpSymbol: tokens.weth.symbol,
isTokenOnly: true,
lpAddresses: '0x4200000000000000000000000000000000000006',
token: tokens.weth,
quoteToken: tokens.weth,
logoA: '/images/tokens/weth.svg',
logoB: ''
},
{
pid: 2,
lpSymbol: tokens.dai.symbol,
isTokenOnly: true,
lpAddresses: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
token: tokens.dai,
quoteToken: tokens.weth,
logoA: '/images/tokens/dai.svg',
logoB: ''
},
{
pid: 6,
lpSymbol: 'WETH-2WILD',
lpAddresses: '0xC2e37dEC5e7b3cE968b4a616D5BfaAd41354499c',
token: tokens.wild,
quoteToken: tokens.weth,
logoA: '/images/tokens/wildx.svg',
logoB: '/images/tokens/weth.svg'
},
{
pid: 7,
lpSymbol: 'USDC-2WILD',
isTokenOnly: false,
lpAddresses: '0x5131D639de2a3080434ccfF0FB3A4250905B4De4',
token: tokens.wild,
quoteToken: tokens.usdc,
logoA: '/images/tokens/wildx.svg',logoB: '/images/tokens/usdc.svg'
},
{
pid: 4,
lpSymbol: 'WETH-USDC',
lpAddresses: '0xeF24722d5daE32Dc155d961561cFFbc5f347EeE7',
token: tokens.usdc,
quoteToken: tokens.weth,
logoA: '/images/tokens/weth.svg',
logoB: '/images/tokens/usdc.svg'
},
}
Config/tokens.js
wild: {
symbol: '2WILD',
address: '0x17697df2Abb7051B8EB2Cec5065Cb8eE2F0A7B6D',
//'0x7c1f5FAC2Ed605Ba8818dEE87dC41c80674F9f68',
//'0xE2f12e32A5Ae550d8F322E053a8A35E49304AE52',
decimals: 18,
projectLink: 'https://wildbase.farm/', // todo:
},
* * *
Please set taxRate to 500 until we start farms.
Before start farming, you must set above configurations