import React, { useState } from 'react';
import MapComponent from './Map';

const MapTabs = () => {
  const [activeTab, setActiveTab] = useState('AOI');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div onClick={() => setActiveTab('AOI')} style={{ cursor: 'pointer', padding: '10px', border: activeTab === 'AOI' ? '1px solid black' : 'none' }}>
          AOI
        </div>
        <div onClick={() => setActiveTab('Current')} style={{ cursor: 'pointer', padding: '10px', border: activeTab === 'Current' ? '1px solid black' : 'none' }}>
          Current
        </div>
        <div onClick={() => setActiveTab('Comparison')} style={{ cursor: 'pointer', padding: '10px', border: activeTab === 'Comparison' ? '1px solid black' : 'none' }}>
          Comparison
        </div>
      </div>
      {activeTab === 'AOI' && <MapComponent showProjectList={false} />}
      {activeTab === 'Current' && <MapComponent showProjectList={false} />}
      {activeTab === 'Comparison' && <MapComponent showProjectList={false} />}
    </div>
  );
};

export default MapTabs;
