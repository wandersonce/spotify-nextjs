'use client';
import useSpotify from '@/app/hooks/useSpotify';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/lib/AppContext';

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const { playlistId, setPlaylistId } = useAppContext();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="h-screen text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <p>Logout</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="w-5 h-5" />
          <p>Home</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <MagnifyingGlassIcon className="w-5 h-5" />
          <p>Search</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <BuildingLibraryIcon className="w-5 h-5" />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="w-5 h-5" />
          <p>Create Playlist</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="w-5 h-5" />
          <p>Your Library</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="w-5 h-5" />
          <p>Like Songs</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlist */}

        {playlists.map((playlist) => {
          return (
            <p
              key={playlist.id}
              onClick={() => setPlaylistId(playlist.id)}
              className="cursor-pointer hover:text-white"
            >
              {playlist.name}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
