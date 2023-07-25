import Sidebar from '@/components/Sidebar';

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
