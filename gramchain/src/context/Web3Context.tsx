'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { connectWallet, getBalance, isWalletConnected } from '../../lib/web3';

interface Web3ContextType {
  address: string | null;
  balance: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  loading: boolean;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType>({
  address: null,
  balance: null,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
  loading: false,
  error: null,
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const connected = await isWalletConnected();
      if (connected) {
        const { address } = await connectWallet();
        setAddress(address);
        const balance = await getBalance(address);
        setBalance(balance);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connect = async () => {
    try {
      setLoading(true);
      setError(null);
      const { address } = await connectWallet();
      setAddress(address);
      const balance = await getBalance(address);
      setBalance(balance);
      setIsConnected(true);
    } catch (error: any) {
      setError(error.message || 'Failed to connect wallet');
      console.error('Error connecting wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setBalance(null);
    setIsConnected(false);
  };

  return (
    <Web3Context.Provider
      value={{
        address,
        balance,
        isConnected,
        connect,
        disconnect,
        loading,
        error,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}; 