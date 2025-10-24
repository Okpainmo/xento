import '@/app/styles/globals.css';
import type { Metadata } from 'next';
import { nunito_sans, poppins, lato } from './utils/font';
import { WalletProvider } from '@/app/lib/wallet/walletProvider';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from '@/app/rtk-base/provider';

export const metadata: Metadata = {
  title: 'Xento: The EVM token transfer engine',
  description: 'The EVM token transfer engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${nunito_sans} ${poppins} ${lato}`}>
      <body suppressHydrationWarning>
        <AppProvider>
          <WalletProvider>
            {children}
            <Toaster position='top-right' />
          </WalletProvider>
        </AppProvider>
      </body>
    </html>
  );
}
