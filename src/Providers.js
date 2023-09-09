import React from 'react'
import { ToastContainer } from 'react-toastify';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  base,
  baseGoerli,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { LanguageProvider } from 'contexts/Localization'
import { ThemeContextProvider } from 'contexts/ThemeContext'

import store from 'state'
import { ModalProvider } from 'uikit'


const Providers = ({ children }) => {

  const { chains, publicClient } = configureChains(
    [base, baseGoerli],
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
        <Provider store={store}>
          <HelmetProvider>
            <ThemeContextProvider>
              <LanguageProvider>
                <RefreshContextProvider>
                  <ModalProvider>
                    {children}
                  </ModalProvider>
                </RefreshContextProvider>
              </LanguageProvider>
            </ThemeContextProvider>
          </HelmetProvider>
          <ToastContainer />
        </Provider>
      </RainbowKitProvider >
    </WagmiConfig >
  )
}

export default Providers
