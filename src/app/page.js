import Center from '@/components/Center';
import Player from '@/components/Player';
import Sidebar from '@/components/Sidebar';

export default async function Home() {
  return (
    <>
      <main className="flex bg-black h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        {/* Center */}
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </>
  );
}
