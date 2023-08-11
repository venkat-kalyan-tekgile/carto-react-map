import React from 'react';
import ProjectList from '../Components/Project/ProjectList';
import MapComponent from '../Components/Map/Map'; // Update the import path as needed

const MapLayout = ({ projects, showProjectList }) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {showProjectList && (
        <div style={{ flex: '0 0 17%', backgroundColor: '#f0f0f0' }}>
          <ProjectList projects={projects} />
        </div>
      )}
      <div style={{ flex: '1', position: 'relative', overflow: 'hidden' }}>
        <MapComponent showProjectList={showProjectList} />
      </div>
    </div>
  );
};

export default MapLayout;
