'use client';
import React, { createContext, useState, useContext } from 'react';

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [playlistId, setPlaylistId] = useState('1bIRfHm6OUMLF6u7wnQEPl');
  // Define any functions or values you want to provide

  const [playlistInfo, setPlaylistInfo] = useState(null);

  //States to control the music playing
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [isPlayingState, setIsPlayingState] = useState(false);

  const playlistIdState = {
    playlistId,
    setPlaylistId,
    playlistInfo,
    setPlaylistInfo,
    currentTrackId,
    setCurrentTrackId,
    isPlayingState,
    setIsPlayingState,
  };

  return (
    <AppContext.Provider value={playlistIdState}>
      {children}
    </AppContext.Provider>
  );
};
// Export the context
export const useAppContext = () => useContext(AppContext);
