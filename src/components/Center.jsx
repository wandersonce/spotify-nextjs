'use client';
import { useAppContext } from '@/lib/AppContext';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import useSpotify from '@/app/hooks/useSpotify';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const { playlistId } = useAppContext();
  const { playlistState, setPlaylistState } = useAppContext();

  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylistState(data.body);
      })
      .catch((err) => console.log(err));
  }, [spotifyApi, playlistId]);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="bg-red-300 flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 p-1 pr-2 rounded-full">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt={session?.user.name}
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="w-10 h-10" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        {/* <img src="" alt="" /> */}
      </section>
    </div>
  );
}

export default Center;
