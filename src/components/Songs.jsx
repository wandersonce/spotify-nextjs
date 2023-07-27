import { useAppContext } from '@/lib/AppContext';
import Song from './Song';

function Songs() {
  const { playlistInfo } = useAppContext();
  return (
    <div className="text-white p-8 flex space-between space-y-1 pb-28 flex-col">
      {playlistInfo?.tracks.items.map((track, i) => {
        return <Song key={track.track.id} track={track} order={i} />;
      })}
    </div>
  );
}

export default Songs;
