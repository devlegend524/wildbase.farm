import './App.css';
import '@rainbow-me/rainbowkit/styles.css';

import { RouterProvider } from "react-router-dom";
import PageRouter from 'router';


import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import BaseLayout from 'layouts/BaseLayout';


function App() {

  const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'wildbase.fram',
    projectId: '85ea32d265dfc865d0672c8b6b5c53d2',
    chains
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <BaseLayout>
          <RouterProvider router={PageRouter} />
        </BaseLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
