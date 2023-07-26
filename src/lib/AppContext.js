'use client';
import React, { createContext, useState, useContext } from 'react';

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [playlistId, setPlaylistId] = useState('1bIRfHm6OUMLF6u7wnQEPl');
  // Define any functions or values you want to provide
  const playlistIdState = {
    playlistId,
    setPlaylistId,
  };
  return (
    <AppContext.Provider value={playlistIdState}>
      {children}
    </AppContext.Provider>
  );
};
// Export the context
export const useAppContext = () => useContext(AppContext);
