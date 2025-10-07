// lib/wallet/connector.ts
import { UniversalConnector, type CustomCaipNetwork } from '@reown/appkit-universal-connector';

export const projectId =
  process.env.NEXT_PUBLIC_WC_PROJECT_ID || '386fa8a5c38212a29cd5caa3f8ebec8f';

if (!projectId) {
  throw new Error('NEXT_PUBLIC_WC_PROJECT_ID is not defined');
}

/* ---------------- Ethereum Networks ---------------- */
const ethereumMainnet: CustomCaipNetwork = {
  id: 1,
  chainNamespace: 'eip155',
  caipNetworkId: 'eip155:1',
  name: 'Ethereum',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.ankr.com/eth'] },
  },
};

const sepolia: CustomCaipNetwork = {
  id: 11155111,
  chainNamespace: 'eip155',
  caipNetworkId: 'eip155:11155111',
  name: 'Sepolia Testnet',
  nativeCurrency: { name: 'SepoliaETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.sepolia.org'] },
  },
};

/* ---------------- Polygon Networks ---------------- */
const polygonMainnet: CustomCaipNetwork = {
  id: 137,
  chainNamespace: 'eip155',
  caipNetworkId: 'eip155:137',
  name: 'Polygon',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://polygon-rpc.com'] },
  },
};

const polygonMumbai: CustomCaipNetwork = {
  id: 80001,
  chainNamespace: 'eip155',
  caipNetworkId: 'eip155:80001',
  name: 'Polygon Mumbai',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc-mumbai.maticvigil.com'] },
  },
};

/* ---------------- Solana Network ---------------- */
const solanaMainnet: CustomCaipNetwork = {
  id: 'mainnet-beta',
  chainNamespace: 'solana',
  caipNetworkId: 'solana:mainnet-beta',
  name: 'Solana',
  nativeCurrency: { name: 'SOL', symbol: 'SOL', decimals: 9 },
  rpcUrls: {
    default: { http: ['https://api.mainnet-beta.solana.com'] },
  },
};

/* ---------------- Export ---------------- */
export const networks: [CustomCaipNetwork, ...CustomCaipNetwork[]] = [
  ethereumMainnet,
  sepolia,
  polygonMainnet,
  polygonMumbai,
  solanaMainnet,
];

export async function getUniversalConnector() {
  const universalConnector = await UniversalConnector.init({
    projectId,
    metadata: {
      name: 'Universal Connector',
      description: 'Universal Connector',
      url: 'https://your-dapp.com',
      icons: ['https://your-dapp.com/icon.png']
    },
    networks: [
      {
        methods: ['eth_sendTransaction', 'personal_sign', 'eth_signTypedData'],
        chains: [
          {
            id: 1, // Ethereum Mainnet
            chainNamespace: 'eip155',
            caipNetworkId: 'eip155:1',
            name: 'Ethereum',
            nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
            rpcUrls: { default: { http: ['https://rpc.ankr.com/eth'] } }
          }
        ],
        events: [],
        namespace: 'eip155'
      }
    ]
  });

  return universalConnector;
}

