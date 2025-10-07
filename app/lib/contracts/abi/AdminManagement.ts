export const adminManagementContractABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'AdminAuth__AccessDenied_AdminOnly', type: 'error' },
  { inputs: [], name: 'AdminManagement__AddressIsNotAnAdmin', type: 'error' },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'adminAddress', type: 'address' },
          { internalType: 'address', name: 'addedBy', type: 'address' },
          { internalType: 'uint256', name: 'addedAt', type: 'uint256' },
        ],
        internalType: 'struct Base__AdminManagement.Admin',
        name: 'admin',
        type: 'tuple',
      },
    ],
    name: 'AdminManagement__AlreadyAddedAsAdmin',
    type: 'error',
  },
  { inputs: [], name: 'AdminManagement__ZeroAddressError', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'contractName',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'addedAdminAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'addedBy',
        type: 'address',
      },
    ],
    name: 'AddedNewAdmin',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'contractName',
        type: 'string',
      },
    ],
    name: 'Logs',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'contractName',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'removedAdminAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'removedBy',
        type: 'address',
      },
    ],
    name: 'RemovedAdmin',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
    name: 'addAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_adminAddress', type: 'address' },
    ],
    name: 'checkIsAdmin',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_adminAddress', type: 'address' },
    ],
    name: 'getAdminAdminRegistrations',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'adminAddress', type: 'address' },
          { internalType: 'address', name: 'addedBy', type: 'address' },
          { internalType: 'uint256', name: 'addedAt', type: 'uint256' },
        ],
        internalType: 'struct Base__AdminManagement.Admin[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_adminAddress', type: 'address' },
    ],
    name: 'getAdminProfile',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'adminAddress', type: 'address' },
          { internalType: 'address', name: 'addedBy', type: 'address' },
          { internalType: 'uint256', name: 'addedAt', type: 'uint256' },
        ],
        internalType: 'struct Base__AdminManagement.Admin',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getContractName',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getContractOwner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPlatformAdmins',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'adminAddress', type: 'address' },
          { internalType: 'address', name: 'addedBy', type: 'address' },
          { internalType: 'uint256', name: 'addedAt', type: 'uint256' },
        ],
        internalType: 'struct Base__AdminManagement.Admin[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ping',
    outputs: [
      { internalType: 'string', name: '', type: 'string' },
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
    name: 'removeAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
