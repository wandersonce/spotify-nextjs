'use client';
import useSpotify from '@/app/hooks/useSpotify';
import { useAppContext } from '@/lib/AppContext';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const { currentTrackId, setCurrentTrackId } = useAppContext();
  const { isPlayingState, setIsPlayingState } = useAppContext();
  const [volume, setVolume] = useState(50);

  return (
    <div>
      {/* Left */}
      <div></div>
    </div>
  );
}

export default Player;
