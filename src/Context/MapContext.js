// MapContext.js
import React, { createContext, useState, useContext } from 'react';

const MapContext = createContext();

export const useMapContext = () => useContext(MapContext);

const MapContextProvider = ({ children }) => {
  const [drawEnabled, setDrawEnabled] = useState(false);

  return (
    <MapContext.Provider value={{ drawEnabled, setDrawEnabled }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
