import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 137, 80001], // Add the chain IDs you want to support
});

export const getContract = (address: string, abi: any, signer: ethers.Signer) => {
  return new ethers.Contract(address, abi, signer);
};

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}; 