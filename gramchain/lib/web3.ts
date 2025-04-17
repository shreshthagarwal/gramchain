import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';

// Add type declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Supported chain IDs
export const supportedChainIds = [1, 3, 4, 5, 42]; // Mainnet, Ropsten, Rinkeby, Goerli, Kovan

// Initialize the injected connector
export const injected = new InjectedConnector({
  supportedChainIds,
});

// Get the provider
export const getProvider = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  }
  throw new Error('Please install MetaMask or another Web3 wallet');
};

// Connect wallet
export const connectWallet = async () => {
  try {
    const provider = await getProvider();
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return { address, provider, signer };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

// Get wallet balance
export const getBalance = async (address: string) => {
  try {
    const provider = await getProvider();
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error('Error getting balance:', error);
    throw error;
  }
};

// Check if wallet is connected
export const isWalletConnected = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts.length > 0;
  }
  return false;
}; 