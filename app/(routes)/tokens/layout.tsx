import '@/app/styles/globals.css';
import type { Metadata } from 'next';
// import { nunito_sans, poppins, lato } from './utils/font';
// import { WalletProvider } from '@/app/lib/wallet/walletProvider';
import { Toaster } from 'react-hot-toast';
import MainAppLayout__Plain from '../../components/layout/MainAppLayout__Plain';

export const metadata: Metadata = {
  title: 'Xento: The DEX platform that grows with you',
  description: 'The DEX platform that grows with you',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainAppLayout__Plain>{children}</MainAppLayout__Plain>;
}
