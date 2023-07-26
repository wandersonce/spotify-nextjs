'use client';
import Center from '@/components/Center';
import Sidebar from '@/components/Sidebar';

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
