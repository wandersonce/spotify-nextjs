import Sidebar from '@/components/Sidebar';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <main>
        {/* Sidebar */}
        <Sidebar />
        {/* Center */}
      </main>

      <div>{/* Player */}</div>
    </>
  );
}
