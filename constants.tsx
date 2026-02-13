
import { Feature, RoadmapItem, TokenAllocation } from './types';

export const NAV_ITEMS = [
  { label: 'Vision', href: '#vision' },
  { label: 'Solution', href: '#solution' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Whitelist', href: '#whitelist' },
];

export const PROBLEM_FEATURES: Feature[] = [
  {
    id: 'public',
    title: 'Public Ledger Exposed',
    description: 'Every transaction is public forever. Anyone can track your balances, income, and spending habits.',
    icon: 'EyeOff',
    color: 'red'
  },
  {
    id: 'leakage',
    title: 'Identity Correlation',
    description: 'Off-chain data often leaks wallet ownership, linking real-world identities to on-chain assets.',
    icon: 'UserX',
    color: 'red'
  },
  {
    id: 'compliance',
    title: 'Institutional Barrier',
    description: 'Enterprises cannot use public blockchains for payroll or trade secrets due to lack of financial privacy.',
    icon: 'ShieldAlert',
    color: 'red'
  }
];

export const SOLUTION_FEATURES: Feature[] = [
  {
    id: 'zkp',
    title: 'Zero-Knowledge Proofs',
    description: 'Verify the validity of a transaction without revealing the sender, receiver, or amount.',
    icon: 'Binary',
    color: 'purple'
  },
  {
    id: 'rollup',
    title: 'Sui ZK-Rollup',
    description: 'Scalable L2 infrastructure built on top of Sui, leveraging its high performance for instant privacy.',
    icon: 'Layers',
    color: 'teal'
  },
  {
    id: 'pedersen',
    title: 'Pedersen Commitments',
    description: 'Cryptographic primitive that ensures transaction values remain hidden but provable.',
    icon: 'Lock',
    color: 'purple'
  }
];

export const ROADMAP_DATA: RoadmapItem[] = [
  {
    phase: 'Phase 1',
    title: 'Ethereal Foundations',
    status: 'completed',
    items: ['ZK-Rollup Architecture Design', 'Core Circuit Development', 'Whitelist for the Testnet', 'Public Testnet Launch']
  },
  {
    phase: 'Phase 2',
    title: 'Shadow Testnet',
    status: 'current',
    items: ['Third-party Security Audits', 'Ghost SDK for Developers', 'Private Sale', 'Public Presale']
  },
  {
    phase: 'Phase 3',
    title: 'Ghost Mainnet',
    status: 'upcoming',
    items: ['Mainnet deployment', 'TGE & Community Airdrop', 'Cross-chain Privacy Bridges', 'Ghost Governance Vault']
  },
  {
    phase: 'Phase 4',
    title: 'Universal Privacy',
    status: 'upcoming',
    items: ['Ghost Suite Launch', 'Mobile Native Wallet', 'Privacy-Preserving DeFi Suite', 'DAO Governance Activation']
  }
];

export const TOKENOMICS_DATA: TokenAllocation[] = [
  { name: 'Ecosystem & Rewards', value: 30, color: '#8b5cf6' },
  { name: 'Core Contributors', value: 20, color: '#4c1d95' },
  { name: 'Investors', value: 15, color: '#2dd4bf' },
  { name: 'Treasury', value: 25, color: '#0d9488' },
  { name: 'Liquidity', value: 10, color: '#14b8a6' },
];
