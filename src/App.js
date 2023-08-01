import React from 'react';
import AppRouter from './AppRouter';
import Navbar from './Components/Navbar';
import MapContextProvider from './Components/MapContext';

const username = 'Venkat';

function App() {
  return (
    <MapContextProvider>
    <div>
      <Navbar username={username} />
      <AppRouter />
    </div>
  </MapContextProvider>
  );
}

export default App;
