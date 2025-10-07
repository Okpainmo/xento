// lib/wallet/walletProvider.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUniversalConnector } from './connector';
import type { UniversalConnector } from '@reown/appkit-universal-connector';
import {
  BrowserProvider,
  Eip1193Provider,
  JsonRpcSigner,
  Network,
} from 'ethers';

interface EthereumProvider extends Eip1193Provider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (
    event: string,
    listener: (...args: unknown[]) => void
  ) => void;
}

type WalletContextType = {
  connector: UniversalConnector | null;
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  address: string | null;
  chainId: number | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connector, setConnector] = useState<UniversalConnector | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  // 🔹 Try MetaMask first on page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ethereum = (window as Window & { ethereum?: EthereumProvider })
        .ethereum;
      if (ethereum) {
        const ethersProvider = new BrowserProvider(ethereum);
        setProvider(ethersProvider);

        ethersProvider.getSigner().then(async (s) => {
          setSigner(s);
          try {
            const addr = await s.getAddress();
            setAddress(addr);
          } catch {
            /* ignore */
          }
        });

        ethersProvider.getNetwork().then((network: Network) => {
          setChainId(Number(network.chainId));
        });
      }
    }
  }, []);

  // 🔹 Attach event listeners
  useEffect(() => {
    const wcProvider = (connector as { provider?: EthereumProvider })?.provider;
    if (!wcProvider?.on) return;

    const onAccounts = (accounts: string[]) => {
      setAddress(accounts?.[0] ?? null);
    };

    const onChain = (chainIdHex: string | number) => {
      const cid =
        typeof chainIdHex === 'string'
          ? parseInt(chainIdHex, 16)
          : Number(chainIdHex);
      setChainId(cid);
    };

    const onDisconnect = () => {
      setProvider(null);
      setSigner(null);
      setAddress(null);
      setChainId(null);
    };

    wcProvider.on(
      'accountsChanged',
      onAccounts as unknown as (...args: unknown[]) => void
    );
    wcProvider.on(
      'chainChanged',
      onChain as unknown as (...args: unknown[]) => void
    );
    wcProvider.on('disconnect', onDisconnect);

    return () => {
      wcProvider.removeListener?.(
        'accountsChanged',
        onAccounts as unknown as (...args: unknown[]) => void
      );
      wcProvider.removeListener?.(
        'chainChanged',
        onChain as unknown as (...args: unknown[]) => void
      );
      wcProvider.removeListener?.('disconnect', onDisconnect);
    };
  }, [connector]);

  // 🔹 Connect
  const connect = async () => {
    try {
      // 1️⃣ Try MetaMask first
      const ethereum = (window as Window & { ethereum?: EthereumProvider })
        .ethereum;
      if (ethereum && ethereum.isMetaMask) {
        const ethersProvider = new BrowserProvider(ethereum);
        setProvider(ethersProvider);

        // Request accounts
        await ethereum.request({ method: 'eth_requestAccounts' });

        const s = await ethersProvider.getSigner();
        setSigner(s);
        setAddress(await s.getAddress());
        setChainId(Number((await ethersProvider.getNetwork()).chainId));

        console.log('✅ Connected via MetaMask');
        return;
      }

      // 2️⃣ Fallback to WalletConnect
      const c = connector ?? (await getUniversalConnector());
      setConnector(c);

      const { session } = await c.connect();
      if (!session) throw new Error('No session returned');

      const wcProvider = c.provider as EthereumProvider;
      const ethersProvider = new BrowserProvider(wcProvider);

      setProvider(ethersProvider);

      const s = await ethersProvider.getSigner();
      setSigner(s);
      setAddress(await s.getAddress());
      setChainId(Number((await ethersProvider.getNetwork()).chainId));

      console.log('✅ Connected via WalletConnect');
    } catch (err) {
      console.error('Wallet connection failed:', err);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  // 🔹 Disconnect
  const disconnect = async () => {
    try {
      await connector?.disconnect();
    } catch (err) {
      console.warn('disconnect error', err);
    }
    setProvider(null);
    setSigner(null);
    setAddress(null);
    setChainId(null);
  };

  return (
    <WalletContext.Provider
      value={{
        connector,
        provider,
        signer,
        address,
        chainId,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used inside WalletProvider');
  return ctx;
}
