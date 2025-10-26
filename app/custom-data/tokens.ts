import ethLogo from '@/app/assets/images/img-2.png';
import daiLogo from '@/app/assets/images/img-3.png';
import usdtLogo from '@/app/assets/images/img-4.png';
import usdcLogo from '@/app/assets/images/img-5.png';

export interface Token {
  name: string;
  logo: any; // Static import type
  address: string;
  symbol: string;
  id?: string;
}

export const tokens: Token[] = [
  {
    name: 'Ethereum',
    logo: ethLogo,
    address: '0x0000000000000000000000000000000000000000', // ETH native token
    symbol: 'ETH',
    id: 'ethereum',
  },
  {
    name: 'Dai Stablecoin',
    logo: daiLogo,
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    symbol: 'DAI',
    id: 'dai',
  },
  {
    name: 'Tether USD',
    logo: usdtLogo,
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    id: 'tether',
  },
  {
    name: 'USD Coin',
    logo: usdcLogo,
    address: '0xA0b86a33E6441b8C4C8C0E4b8b2C8C0E4b8b2C8C',
    symbol: 'USDC',
    id: 'usd-coin',
  },
];

// Helper functions for token operations
export const getTokenBySymbol = (symbol: string): Token | undefined => {
  return tokens.find(
    (token) => token.symbol.toUpperCase() === symbol.toUpperCase()
  );
};

export const getTokenByAddress = (address: string): Token | undefined => {
  return tokens.find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );
};

export const getTokenSymbols = (): string[] => {
  return tokens.map((token) => token.symbol);
};

export const getTokenNames = (): string[] => {
  return tokens.map((token) => token.name);
};
