import React from 'react';
import ProjectEditForm from '../Components/Project/ProjectDetails';
import MapTabs from '../Components/common/MapTabs';
import MapComponent from '../Components/Map/Map';
import { useProjectsContext } from '../Context/ProjectContext';

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
