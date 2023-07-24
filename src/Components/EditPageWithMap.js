import React from 'react';
import ProjectEditForm from './ProjectDetails';
import MapComponent from './Map';

const EditPage = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: '1 1 30%', padding: '20px' }}>
        <ProjectEditForm />
      </div>
      <div style={{ flex: '1 1 70%', position: 'relative' }}>
        <MapComponent showProjectList={false} />
      </div>
    </div>
  );
};

export default EditPage;
