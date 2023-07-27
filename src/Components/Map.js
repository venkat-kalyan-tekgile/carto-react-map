import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import Navbar from './Navbar';
import { CircularProgress } from '@mui/material';
import ProjectList from './ProjectList';

mapboxgl.accessToken = 'pk.eyJ1IjoidmVua2F0a2FseWFuIiwiYSI6ImNsaDVyeDV2ZTJhcXczZ3F2a3hkajc3MjIifQ.TTwoxgxSMDeHtVdbvZ6hLA';

const MapComponent = ({ showProjectList }) => {

  const mapContainerRef = useRef(null);
  const drawRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const latitude = 40.7128;
  const longitude = -74.0060;

  const center = [longitude, latitude];
  const username = 'Venkat';

  const projects = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    { id: 3, name: 'Project 3' },
  ];

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: 13,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        point: true,
        line_string: true,
        polygon: true,
        trash: true,
      },
    });

    map.addControl(draw);

    map.on('draw.create', (e) => {
      console.log('Feature created:', e.features);
    });

    map.on('load', () => {
      setIsLoading(false);
    });

    drawRef.current = draw;

    return () => {
      map.remove();
    };
  }, [center]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar username={username} />
      <div style={{ display: 'flex', flexGrow: 1, position: 'relative' }}>
      {showProjectList && ( 
          <div style={{ flex: '0 0 17%', backgroundColor: '#f0f0f0' }}>
            <ProjectList projects={projects} />
          </div>
        )}
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1, 
            }}
          >
            <CircularProgress />
          </div>
        )}
        <div ref={mapContainerRef} style={{ flex: '1', position: 'relative' }}></div>
      </div>
    </div>
  );
};

export default MapComponent;





// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
// import Navbar from './Navbar';
// import { CircularProgress } from '@mui/material';
// import ProjectList from './ProjectList';
// import { Basemap } from '@carto/react-ui';
// import { CARTOVectorTileLayer } from '@carto/react-core';


// mapboxgl.accessToken = 'pk.eyJ1IjoidmVua2F0a2FseWFuIiwiYSI6ImNsaDVyeDV2ZTJhcXczZ3F2a3hkajc3MjIifQ.TTwoxgxSMDeHtVdbvZ6hLA';

// const MapComponent = ({ showProjectList }) => {
//   const mapContainerRef = useRef(null);
//   const drawRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const latitude = 40.7128;
//   const longitude = -74.0060;

//   const center = [longitude, latitude];
//   const username = 'Venkat';

//   const projects = [
//     { id: 1, name: 'Project 1' },
//     { id: 2, name: 'Project 2' },
//     { id: 3, name: 'Project 3' },
//   ];

//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: center,
//       zoom: 13,
//     });

//     const draw = new MapboxDraw({
//       displayControlsDefault: false,
//       controls: {
//         point: true,
//         line_string: true,
//         polygon: true,
//         trash: true,
//       },
//     });

//     map.addControl(draw);

//     map.on('draw.create', (e) => {
//       console.log('Feature created:', e.features);
//     });

//     map.on('load', () => {
//       setIsLoading(false);
//     });

//     drawRef.current = draw;

//     // Add CARTO layer
//     const cartoLayer = new CARTOVectorTileLayer({
//       source: {
//         id: 'carto-source',
//         type: 'vector',
//         data: {
//           account: 'your_carto_account_name', // Replace with your CARTO username
//           layers: [
//             {
//               id: 'carto-layer',
//               type: 'mapnik',
//               options: {
//                 cartocss: `#carto-layer { polygon-fill: #FF0000; }`, // Customize the cartoCSS style
//               },
//             },
//           ],
//         },
//       },
//     });

//     // Add basemap and CARTO layer to the map
//     map.addLayer(cartoLayer);
//     map.addLayer(Basemap.VoyagerLabels);

//     return () => {
//       map.remove();
//     };
//   }, [center]);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       <Navbar username={username} />
//       <div style={{ display: 'flex', flexGrow: 1, position: 'relative' }}>
//         {showProjectList && ( 
//           <div style={{ flex: '0 0 17%', backgroundColor: '#f0f0f0' }}>
//             <ProjectList projects={projects} />
//           </div>
//         )}
//         {isLoading && (
//           <div
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: 'rgba(255, 255, 255, 0.8)',
//               zIndex: 1, 
//             }}
//           >
//             <CircularProgress />
//           </div>
//         )}
//         <div ref={mapContainerRef} style={{ flex: '1', position: 'relative' }}></div>
//       </div>
//     </div>
//   );
// };

// export default MapComponent;



// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
// import Navbar from './Navbar';
// import { CircularProgress } from '@mui/material';
// import ProjectList from './ProjectList';
// import { DeckLayer } from '@deck.gl/react';
// import { CartoLayer } from '@deck.gl/carto';

// mapboxgl.accessToken = 'pk.eyJ1IjoidmVua2F0a2FseWFuIiwiYSI6ImNsaDVyeDV2ZTJhcXczZ3F2a3hkajc3MjIifQ.TTwoxgxSMDeHtVdbvZ6hLA';

// const MapComponent = ({ showProjectList }) => {
//   const mapContainerRef = useRef(null);
//   const drawRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const latitude = 40.7128;
//   const longitude = -74.0060;

//   const center = [longitude, latitude];
//   const username = 'Venkat';

//   const projects = [
//     { id: 1, name: 'Project 1' },
//     { id: 2, name: 'Project 2' },
//     { id: 3, name: 'Project 3' },
//   ];

//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: center,
//       zoom: 13,
//     });

//     const draw = new MapboxDraw({
//       displayControlsDefault: false,
//       controls: {
//         point: true,
//         line_string: true,
//         polygon: true,
//         trash: true,
//       },
//     });

//     map.addControl(draw);

//     map.on('draw.create', (e) => {
//       console.log('Feature created:', e.features);
//     });

//     map.on('load', () => {
//       setIsLoading(false);
//     });

//     drawRef.current = draw;

//     return () => {
//       map.remove();
//     };
//   }, [center]);

//   // Carto layer settings
//   const cartoLayer = new CartoLayer({
//     type: 'Polygon',
//     data: 'SELECT * FROM your_carto_table_name', // Replace with your Carto SQL query or table name
//     credentials: {
//       username: 'your_carto_username', // Replace with your Carto username
//       apiKey: 'your_carto_api_key', // Replace with your Carto API key
//     },
//     getFillColor: [255, 0, 0, 128],
//   });

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       <Navbar username={username} />
//       <div style={{ display: 'flex', flexGrow: 1, position: 'relative' }}>
//         {showProjectList && (
//           <div style={{ flex: '0 0 17%', backgroundColor: '#f0f0f0' }}>
//             <ProjectList projects={projects} />
//           </div>
//         )}
//         {isLoading && (
//           <div
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: 'rgba(255, 255, 255, 0.8)',
//               zIndex: 1,
//             }}
//           >
//             <CircularProgress />
//           </div>
//         )}
//         <div ref={mapContainerRef} style={{ flex: '1', position: 'relative' }}>
//           {/* Add Carto layer */}
//           <DeckLayer layers={[cartoLayer]} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MapComponent;
