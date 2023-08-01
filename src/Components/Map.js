// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
// import Navbar from './Navbar';
// import { CircularProgress } from '@mui/material';
// import ProjectList from './ProjectList';
// import { CartoLayer, GeoJsonLayer } from '@deck.gl/carto';

// mapboxgl.accessToken = 'pk.eyJ1IjoidmVua2F0a2FseWFuIiwiYSI6ImNsa2trazd0bTA0eGkzcm9lZG9ieHQwMG8ifQ.-8uxfBRQZHGBtLaK6egPvQ';

// const MapComponent = ({ showProjectList }) => {
//   const mapContainerRef = useRef(null);
//   const drawRef = useRef(null);
//   const smallMapRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedBasemap, setSelectedBasemap] = useState('streets-v11');

//   const latitude = 40.7128;
//   const longitude = -74.0060;
//   const center = [longitude, latitude];
//   const username = 'Venkat';

//   const projects = [
//     { id: 1, name: 'Project 1' },
//     { id: 2, name: 'Project 2' },
//     { id: 3, name: 'Project 3' },
//   ];

//   const basemaps = [
//     { id: 'streets-v11', name: 'Streets', image: '/path-to-streets-image.png' },
//     { id: 'satellite-v9', name: 'Satellite', image: '/path-to-satellite-image.png' },
//     // Add more basemaps as needed
//   ];

//   const createSmallMap = () => {
//     return new mapboxgl.Map({
//       container: smallMapRef.current,
//       style: `mapbox://styles/mapbox/${selectedBasemap}`, // Use the selected basemap
//       center: center,
//       zoom: 10,
//       interactive: false, 
//     });
//   };

//   const fakeSourceData = {
//     type: 'FeatureCollection',
//     features: [
//       {
//         type: 'Feature',
//         geometry: {
//           type: 'Point',
//           coordinates: [longitude, latitude], // Replace longitude and latitude with your desired coordinates
//         },
//         properties: {
//           aggregated_total: 5000, // Replace 5000 with your desired value
//         },
//       },
//       // Add more features with different coordinates and attributes as needed
//     ],
//   };

//   const fakeCartoSource = {
//     type: 'GeoJSON',
//     data: fakeSourceData,
//   };

//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: `mapbox://styles/mapbox/${selectedBasemap}`, // Use the selected basemap
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

//     // Add the fake Carto layer here
//     map.on('load', () => {
//       setIsLoading(false);

//       // Add the fake Carto layer here after the map has loaded
//       const fakeCartoLayer = new CartoLayer({
//         source: fakeCartoSource,
//         style: {
//           pointColor: [255, 0, 0],
//           pointRadius: 6,
//         },
//       });

//       console.log('layer', fakeCartoLayer)

//       map.addLayer(fakeCartoLayer);
//     });


//     return () => {
//       map.remove();
//       if (smallMapRef.current) {
//         smallMapRef.current.remove();
//       }
//     };
//   }, [center, selectedBasemap]);

//   useEffect(() => {
//     if (!isLoading) {
//       const smallMap = createSmallMap();

//       return () => {
//         if (smallMap) smallMap.remove();
//       };
//     }
//   }, [isLoading, selectedBasemap]);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       {/* {showProjectList && (
//           <Navbar username={username} /> 
//         )} */}
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
//           {/* Add a div for the basemap selection dropdown */}
//           <div
//             style={{
//               position: 'absolute',
//               top: '10px',
//               right: '10px',
//               padding: '10px',
//               backgroundColor: '#fff',
//               borderRadius: '4px',
//               zIndex: 1,
//               boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//               display: 'flex',
//               alignItems: 'center',
//             }}
//           >
//             <span style={{ marginRight: '10px' }}>Select Basemap:</span>
//             <select
//               value={selectedBasemap}
//               onChange={(e) => setSelectedBasemap(e.target.value)}
//               style={{
//                 padding: '5px',
//                 borderRadius: '4px',
//                 border: '1px solid #ccc',
//               }}
//             >
//               {basemaps.map((basemap) => (
//                 <option key={basemap.id} value={basemap.id}>
//                   {basemap.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         {/* Add a div for the small map */}
//         <div
//           ref={smallMapRef}
//           style={{
//             position: 'absolute',
//             bottom: '10px',
//             right: '10px',
//             width: '200px',
//             height: '200px',
//             border: '1px solid #ccc',
//           }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default MapComponent;





// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import { client, credentials, CartoSQLLayer, QueryManager } from '@carto/react-api'; 
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
// import Navbar from './Navbar';
// import { CircularProgress } from '@mui/material';
// import ProjectList from './ProjectList';

// mapboxgl.accessToken = 'pk.eyJ1IjoidmVua2F0a2FseWFuIiwiYSI6ImNsa2trazd0bTA0eGkzcm9lZG9ieHQwMG8ifQ.-8uxfBRQZHGBtLaK6egPvQ';

// const MapComponent = ({ showProjectList }) => {
//   const mapContainerRef = useRef(null);
//   const drawRef = useRef(null);
//   const smallMapRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedBasemap, setSelectedBasemap] = useState('streets-v11');

//   const latitude = 40.7128;
//   const longitude = -74.0060;
//   const center = [longitude, latitude];
//   const username = 'Venkat';

//   const projects = [
//     { id: 1, name: 'Project 1' },
//     { id: 2, name: 'Project 2' },
//     { id: 3, name: 'Project 3' },
//   ];

//   const basemaps = [
//     { id: 'streets-v11', name: 'Streets', image: '/path-to-streets-image.png' },
//     { id: 'satellite-v9', name: 'Satellite', image: '/path-to-satellite-image.png' },
//     // Add more basemaps as needed
//   ];

//   const createSmallMap = () => {
//     return new mapboxgl.Map({
//       container: smallMapRef.current,
//       style: `mapbox://styles/mapbox/${selectedBasemap}`, // Use the selected basemap
//       center: center,
//       zoom: 10,
//       interactive: false,
//     });
//   };

//   const addCartoLayer = (map) => {
//     // CARTO Credentials
//     const CARTO_USERNAME = 'YOUR_USERNAME';
//     const CARTO_APIKEY = 'YOUR_CARTO_APIKEY'; 
//     const CARTO_DATASET = 'YOUR_DATASET';

//     // Create a CARTO credentials object
//     const cartoCredentials = credentials({
//       username: CARTO_USERNAME,
//       apiKey: CARTO_APIKEY,
//     });

//     // Create a CARTO layer using the dataset
//     const cartoLayer = new CartoSQLLayer({
//       data: `SELECT * FROM ${CARTO_DATASET}`, 
//       credentials: cartoCredentials,
//       queryManager: new QueryManager({
//         client: client,
//       }),
//     });

//     // Add the CARTO layer to the map
//     map.addLayer(cartoLayer);
//   };

//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: `mapbox://styles/mapbox/${selectedBasemap}`, // Use the selected basemap
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
//       // Call the function to add the CARTO layer
//       addCartoLayer(map);

//       setIsLoading(false);
//     });

//     drawRef.current = draw;

//     return () => {
//       map.remove();
//       if (smallMapRef.current) {
//         smallMapRef.current.remove();
//       }
//     };
//   }, [center, selectedBasemap]);

//   useEffect(() => {
//     if (!isLoading) {
//       const smallMap = createSmallMap();

//       return () => {
//         if (smallMap) smallMap.remove();
//       };
//     }
//   }, [isLoading, selectedBasemap]);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       {/* {showProjectList && (
//           <Navbar username={username} /> 
//         )} */}
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
//           {/* Add a div for the basemap selection dropdown */}
//           <div
//             style={{
//               position: 'absolute',
//               top: '10px',
//               right: '10px',
//               padding: '10px',
//               backgroundColor: '#fff',
//               borderRadius: '4px',
//               zIndex: 1,
//               boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//               display: 'flex',
//               alignItems: 'center',
//             }}
//           >
//             <span style={{ marginRight: '10px' }}>Select Basemap:</span>
//             <select
//               value={selectedBasemap}
//               onChange={(e) => setSelectedBasemap(e.target.value)}
//               style={{
//                 padding: '5px',
//                 borderRadius: '4px',
//                 border: '1px solid #ccc',
//               }}
//             >
//               {basemaps.map((basemap) => (
//                 <option key={basemap.id} value={basemap.id}>
//                   {basemap.name}
//                 </option>
             
//              ))}
//              </select>
//            </div>
//          </div>
//          {/* Add a div for the small map */}
//          <div
//            ref={smallMapRef}
//            style={{
//              position: 'absolute',
//              bottom: '10px',
//              right: '10px',
//              width: '200px',
//              height: '200px',
//              border: '1px solid #ccc',
//            }}
//          ></div>
//        </div>
//      </div>
//    );
//  };
 
//  export default MapComponent;
 

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import {
  CircularProgress,
  Dialog,
  DialogContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from '@mui/material';
import ProjectList from './ProjectList';
import axios from 'axios';
import { useMapContext } from './MapContext';
import { addCartoLayer } from '../utils/carto';

mapboxgl.accessToken = 'pk.eyJ1IjoidmVua2F0a2FseWFuIiwiYSI6ImNsa2trazd0bTA0eGkzcm9lZG9ieHQwMG8ifQ.-8uxfBRQZHGBtLaK6egPvQ';

const MapComponent = ({ showProjectList }) => {
  const mapContainerRef = useRef(null);
  const drawRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBasemap, setSelectedBasemap] = useState('streets-v11');
  const { drawEnabled } = useMapContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedPolygon, setSelectedPolygon] = useState(null);

  const latitude = 40.7128;
  const longitude = -74.0060;
  const center = [longitude, latitude];
  const username = 'Venkat';

  const projects = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    { id: 3, name: 'Project 3' },
  ];

  const basemaps = [
    { id: 'streets-v11', name: 'Streets', image: '/path-to-streets-image.png' },
    { id: 'satellite-v9', name: 'Satellite', image: '/path-to-satellite-image.png' },
    // Add more basemaps as needed
  ];

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/mapbox/${selectedBasemap}`, // Use the selected basemap
      center: center,
      zoom: 13,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        point: drawEnabled,
        line_string: drawEnabled,
        polygon: drawEnabled,
        trash: drawEnabled,
      },
    });

    map.addControl(draw);

    map.on('draw.create', (e) => {
      console.log('Feature created:', e.features);
      const newFeature = e.features[0];
      setIsFormOpen(true);
      setSelectedPolygon(newFeature);
    });

    map.on('load', () => {
      // Call the function to add the CARTO layer
      addCartoLayer(map, setIsLoading);
    });

    drawRef.current = draw;

    return () => {
      map.remove();
    };
  }, [ selectedBasemap, drawEnabled]);

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedOption('');
  };

  const handleFormSubmit = () => {
    // Update the polygon color based on the selected option
    let fillColor;
    switch (selectedOption) {
      case 'tree':
        fillColor = 'green';
        break;
      case 'water':
        fillColor = 'blue';
        break;
      case 'grassland':
        fillColor = 'darkgreen';
        break;
      default:
        fillColor = 'gray'; // Default color if no option is selected
    }

    if (selectedPolygon) {
      const updatedPolygon = { ...selectedPolygon };
      updatedPolygon.properties = {
        ...updatedPolygon.properties,
        fillColor: fillColor,
      };

      const draw = drawRef.current;
      draw.delete(selectedPolygon.id);
      draw.add(updatedPolygon);

      setSelectedPolygon(updatedPolygon);
    }

    setIsFormOpen(false);
    setSelectedOption('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Dialog open={isFormOpen} onClose={handleFormClose}>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select an option:</FormLabel>
            <RadioGroup
              aria-label="option"
              name="option"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <FormControlLabel value="tree" control={<Radio />} label="Tree Cover" />
              <FormControlLabel value="water" control={<Radio />} label="Open Water" />
              <FormControlLabel value="grassland" control={<Radio />} label="Grassland" />
            </RadioGroup>
            <Button variant="contained" color="primary" onClick={handleFormSubmit}>
              Submit
            </Button>
          </FormControl>
        </DialogContent>
      </Dialog>

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
        <div ref={mapContainerRef} style={{ flex: '1', position: 'relative' }}>
          {/* Add a div for the basemap selection dropdown */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              padding: '10px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              zIndex: 1,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '10px' }}>Select Basemap:</span>
            <select
              value={selectedBasemap}
              onChange={(e) => setSelectedBasemap(e.target.value)}
              style={{
                padding: '5px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            >
              {basemaps.map((basemap) => (
                <option key={basemap.id} value={basemap.id}>
                  {basemap.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Add a div for the small map */}
        <div
          // ref={smallMapRef}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            width: '200px',
            height: '200px',
            border: '1px solid #ccc',
          }}
        ></div>
      </div>
    </div>
  );
};

export default MapComponent;









