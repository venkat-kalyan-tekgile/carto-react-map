import React from 'react';
import ProjectList from '../Components/Project/ProjectList';
import MapComponent from '../Components/Map/Map';
import { useProjectsContext } from '../Context/ProjectContext';

const MapLayout = () => {
const { projectsData } = useProjectsContext();
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      
        <div style={{ flex: '0 0 17%', backgroundColor: '#f0f0f0' }}>
          <ProjectList projects={projectsData} />
        </div>
      
      <div style={{ flex: '1', position: 'relative', overflow: 'hidden' }}>
        <MapComponent />
      </div>
    </div>
  );
};

export default MapLayout;
