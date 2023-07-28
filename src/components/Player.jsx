'use client';
import useSongInfo from '@/app/hooks/useSongInfo';
import useSpotify from '@/app/hooks/useSpotify';
import { useAppContext } from '@/lib/AppContext';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import {
  HeartIcon,
  SpeakerWaveIcon as VolumeDownIcon,
} from '@heroicons/react/24/outline';

import {
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  SpeakerWaveIcon,
  PlayIcon,
  PauseIcon,
  ArrowUturnLeftIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/solid';
import { debounce } from 'lodash';

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const { currentTrackId, setCurrentTrackId } = useAppContext();
  const { isPlayingState, setIsPlayingState } = useAppContext();
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log('Now Playing: ', data.body?.item);
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlayingState(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      //fetch song info
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlayingState(false);
      } else {
        spotifyApi.play();
        setIsPlayingState(true);
      }
    });
  };

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 300),
    []
  );

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* center */}
      <div className="flex items-center justify-evenly">
        <ArrowsRightLeftIcon className="button" />
        <BackwardIcon
          onClick={() => spotifyApi.skipToPrevious()}
          className="button"
        />
        {isPlayingState ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}
        <ForwardIcon
          onClick={() => spotifyApi.skipToNext()}
          className="button"
        />
        <ArrowUturnLeftIcon
          className="button"
          onClick={() => spotifyApi.skipToNext()}
        />
      </div>

      {/* RIGHT */}

      <div className="flex items-center space-x-3 md:space-x-4 justify-end">
        <SpeakerXMarkIcon onClick={() => setVolume(1)} className="button" />
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-14 md:w-28"
          type="range"
          min={0}
          max={100}
          value={volume}
        />
        <SpeakerWaveIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button"
        />
      </div>
    </div>
  );
}

export default Player;
