import Sidebar from '@/components/Sidebar';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <main className="bg-black h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        {/* Center */}
      </main>

      <div>{/* Player */}</div>
    </>
  );
}
