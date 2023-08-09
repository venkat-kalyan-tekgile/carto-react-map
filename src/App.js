import React from 'react';
import AppRouter from './AppRouter';
import Navbar from './Components/Navbar';
import MapContextProvider from './Components/MapContext';
import { ProjectsProvider } from './Components/ProjectContext';

const username = 'Venkat';

function App() {
  return (
    <MapContextProvider>
       <ProjectsProvider>
    <div>
      <Navbar username={username} />
      <AppRouter />
    </div>
    </ProjectsProvider>
  </MapContextProvider>
  );
}

export default App;
