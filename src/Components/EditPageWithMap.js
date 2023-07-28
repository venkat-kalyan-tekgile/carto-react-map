import React, { useState } from 'react';
import ProjectEditForm from './ProjectDetails';
import MapComponent from './Map';

const EditPage = () => {
  const [activeTab, setActiveTab] = useState('AOI');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const tabs = ['AOI', 'Current', 'Comparison'];

  const tabMapCenters = {
    AOI: { latitude: 40.7128, longitude: -74.0060 },
    Current: { latitude: 41.8781, longitude: -87.6298 },
    Comparison: { latitude: 34.0522, longitude: -118.2437 },
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            style={{ padding: '10px', margin: '5px', backgroundColor: activeTab === tab ? 'lightblue' : 'white' }}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', height: '100%', flexGrow: 1 }}>
        <div style={{ flex: '1 1 30%', padding: '20px' }}>
          <ProjectEditForm />
        </div>
        <div style={{ flex: '1 1 70%', position: 'relative' }}>
          <MapComponent showProjectList={false} />
        </div>
      </div>
    </div>
  );
};

export default EditPage;
