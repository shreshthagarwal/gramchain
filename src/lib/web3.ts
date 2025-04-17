import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'

const chains = [mainnet, polygon]
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId })
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})

const ethereumClient = new EthereumClient(wagmiConfig, chains)

export { wagmiConfig, ethereumClient, Web3Modal }