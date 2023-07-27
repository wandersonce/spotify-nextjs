import { useAppContext } from '@/lib/AppContext';
import useSpotify from './useSpotify';
import { useEffect, useState } from 'react';

function useSongInfo() {
  const spotifyApi = useSpotify();
  const { currentTrackId, setCurrentTrackId } = useAppContext();
  const [songInfo, setSongInfo] = useState(null);

  console.log(currentTrackId);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());

        setSongInfo(trackInfo);
      }
    };

    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
}

export default useSongInfo;
