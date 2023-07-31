import React from 'react';
import MapComponent from './Map';

const MapContainer = ({ setDrawnFeatures, drawnFeatures }) => {
  return <MapComponent setDrawnFeatures={setDrawnFeatures} drawnFeatures={drawnFeatures} />;
};

export default MapContainer;
