import './globals.css';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from './providers';
import { AppProvider } from '@/lib/AppContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'The Next Spotify',
  description: 'A Clone of Spotify...Or not?!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <AppProvider>{children}</AppProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
