'use client';
import { useAppContext } from '@/lib/AppContext';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { getSession, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import useSpotify from '@/app/hooks/useSpotify';
import Songs from './Songs';

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
  const { playlistInfo, setPlaylistInfo } = useAppContext();

  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylistInfo(data.body);
      })
      .catch((err) => console.log(err));
  }, [spotifyApi, playlistId, session]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="text-white flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 p-1 pr-2 rounded-full"
          onClick={signOut}
        >
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
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlistInfo?.images[0]?.url}
          alt={playlistInfo?.name}
        />

        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlistInfo?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
