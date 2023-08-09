import React from 'react';
import ProjectEditForm from './ProjectDetails';
import MapTabs from './MapTabs';
import MapComponent from './Map';
import { useProjectsContext } from './ProjectContext';

const EditPage = () => {
  const { projectsData } = useProjectsContext();
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: '1 1 30%', padding: '20px' }}>
        <ProjectEditForm projects={projectsData}/>
        <MapTabs />
      </div>
      <div style={{ flex: '1 1 70%', position: 'relative' }}>
        <MapComponent showProjectList={false} />
      </div>
    </div>
  );
};

export default EditPage;
