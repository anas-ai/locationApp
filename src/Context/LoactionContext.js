import React, {createContext, useState, useContext} from 'react';

// Create Context
const LocationContext = createContext();

// LocationProvider to wrap your components
export const LocationProvider = ({children}) => {
  const [location, setLocation] = useState(null);

  return (
    <LocationContext.Provider value={{}}>{children}</LocationContext.Provider>
  );
};

// Custom hook to use the LocationContext
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
