'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';
import { useToast } from '@chakra-ui/react';

interface Web3ContextType {
  account: string | null;
  chainId: number | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  provider: ethers.providers.Web3Provider | null;
}

const Web3Context = createContext<Web3ContextType>({
  account: null,
  chainId: null,
  connect: async () => {},
  disconnect: () => {},
  isConnecting: false,
  provider: null,
});

export const useWeb3 = () => useContext(Web3Context);

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 137, 80001], // Add the chain IDs you want to support
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const { active, account, activate, deactivate } = useWeb3React();
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
    }
  }, []);

  const connect = async () => {
    try {
      setIsConnecting(true);
      await activate(injected);
      toast({
        title: 'Wallet Connected',
        description: 'Your wallet has been connected successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Connection Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    try {
      deactivate();
      toast({
        title: 'Wallet Disconnected',
        description: 'Your wallet has been disconnected',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Disconnection Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Web3Context.Provider
      value={{
        account: account || null,
        chainId: provider?.network?.chainId || null,
        connect,
        disconnect,
        isConnecting,
        provider,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
} 