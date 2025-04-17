'use client';

import { useWeb3 } from '../context/Web3Context';

export default function WalletConnect() {
  const { address, balance, isConnected, connect, disconnect, loading, error } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="flex items-center space-x-4">
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
      
      {isConnected ? (
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <span className="font-medium">{formatAddress(address!)}</span>
            <span className="ml-2 text-gray-500">
              {balance ? `${parseFloat(balance).toFixed(4)} ETH` : ''}
            </span>
          </div>
          <button
            onClick={disconnect}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connect}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
} 