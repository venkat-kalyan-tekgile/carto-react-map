import React from 'react';
import AppRouter from './AppRouter';
import Navbar from './Components/common/Navbar';
import MapContextProvider from './Context/MapContext';
import { ProjectsProvider } from './Context/ProjectContext';

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
