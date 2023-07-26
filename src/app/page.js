import Center from '@/components/Center';
import Sidebar from '@/components/Sidebar';
import { getSession } from 'next-auth/react';

export default function Home() {
  return (
    <>
      <main className="flex bg-black h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        {/* Center */}
        <Center />
      </main>

      <div>{/* Player */}</div>
    </>
  );
}
