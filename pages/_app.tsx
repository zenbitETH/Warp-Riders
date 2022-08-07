import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
  Theme 
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { AppWrapper } from '../context/useAppContext';


const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHMEY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const myCustomTheme: Theme = {
  blurs: {
    modalOverlay: '...',
  },
  colors: {
    accentColor: '...',
    accentColorForeground: '...',
    actionButtonBorder: '#29346200',
    actionButtonBorderMobile: '#29346200',
    actionButtonSecondaryBackground: '...',
    closeButton: '...',
    closeButtonBackground: '...',
    connectButtonBackground: '...',
    connectButtonBackgroundError: '...',
    connectButtonInnerBackground: '...',
    connectButtonText: '...',
    connectButtonTextError: '...',
    connectionIndicator: '...',
    error: '...',
    generalBorder: '#29346200',
    generalBorderDim: '...',
    menuItemBackground: '...',
    modalBackdrop: '#29346275',
    modalBackground: '#293462',
    modalBorder: '...',
    modalText: '#fff',
    modalTextDim: '...',
    modalTextSecondary: '...',
    profileAction: '...',
    profileActionHover: '...',
    profileForeground: '...',
    selectedOptionBorder: '#29346200',
    standby: '...',
  },
  fonts: {
    body: 'Bungee Inline',
  },
  radii: {
    actionButton: '...',
    connectButton: '...',
    menuButton: '...',
    modal: '...',
    modalMobile: '...',
  },
  shadows: {
    connectButton: 'large',
    dialog: '...',
    profileDetailsAction: '...',
    selectedOption: '...',
    selectedWallet: '...',
    walletLogo: '...',
  },
};


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains} 
        
        theme={myCustomTheme}>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </RainbowKitProvider>
    </WagmiConfig>        
  )
}

export default MyApp
