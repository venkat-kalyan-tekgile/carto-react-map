

// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
// import { CartoLayer, setDefaultCredentials, MAP_TYPES } from '@deck.gl/carto'; // Import CartoLayer

// import {
//   CircularProgress,
//   Dialog,
//   DialogContent,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   FormLabel,
//   Button,
// } from '@mui/material';
// import ProjectList from './ProjectList';
// import axios from 'axios';
// import { useMapContext } from './MapContext';
// import { addCartoLayer } from '../utils/carto';

// mapboxgl.accessToken = 'pk.eyJ1IjoidmVua2F0a2FseWFuIiwiYSI6ImNsa2trazd0bTA0eGkzcm9lZG9ieHQwMG8ifQ.-8uxfBRQZHGBtLaK6egPvQ';

// const MapComponent = ({ showProjectList }) => {
//   const mapContainerRef = useRef(null);
//   const drawRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedBasemap, setSelectedBasemap] = useState('streets-v11');
//   const { drawEnabled } = useMapContext();
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [selectedPolygon, setSelectedPolygon] = useState(null);

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
//         point: drawEnabled,
//         line_string: drawEnabled,
//         polygon: drawEnabled,
//         trash: drawEnabled,
//       },
//     });

//     map.addControl(draw);

//     map.on('draw.create', (e) => {
//       console.log('Feature created:', e.features);
//       const newFeature = e.features[0];
//       setIsFormOpen(true);
//       setSelectedPolygon(newFeature);
//     });

//     map.on('load', () => {
//       // Add the CartoLayer
//       setDefaultCredentials({
//         accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfMWg2eGQxc2MiLCJqdGkiOiIwNDcxMjlkYiJ9.qdrpqYggDrYqaO1Oher5_lQn1pYy8TYdywexIm8cCGg',
//         apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
//       });

//       const layer = new CartoLayer({
//         type: MAP_TYPES.TABLE,
//         connection: 'bigquery',
//         data: 'cartobq.testtables.h3',
//         geoColumn: 'h3',
//         aggregationExp: 'AVG(population) as population',
//         getFillColor: [238, 77, 90],
//         getElevation: d => d.properties.population,
//         source: 'mySource',
//       });

//       map.addLayer(layer); // Add the CartoLayer to the map
//       setIsLoading(false); // Set isLoading to false after adding the layer
//     });

//     drawRef.current = draw;

//     return () => {
//       map.remove();
//     };
//   }, [selectedBasemap, drawEnabled]);

//   const handleFormClose = () => {
//     setIsFormOpen(false);
//     setSelectedOption('');
//   };

//   const handleFormSubmit = () => {
//     // Update the polygon color based on the selected option
//     let fillColor;
//     switch (selectedOption) {
//       case 'tree':
//         fillColor = 'green';
//         break;
//       case 'water':
//         fillColor = 'blue';
//         break;
//       case 'grassland':
//         fillColor = 'darkgreen';
//         break;
//       default:
//         fillColor = 'gray'; // Default color if no option is selected
//     }

//     if (selectedPolygon) {
//       const updatedPolygon = { ...selectedPolygon };
//       updatedPolygon.properties = {
//         ...updatedPolygon.properties,
//         fillColor: fillColor,
//       };

//       const draw = drawRef.current;
//       draw.delete(selectedPolygon.id);
//       draw.add(updatedPolygon);

//       setSelectedPolygon(updatedPolygon);
//     }

//     setIsFormOpen(false);
//     setSelectedOption('');
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       <Dialog open={isFormOpen} onClose={handleFormClose}>
//         <DialogContent>
//           <FormControl component="fieldset">
//             <FormLabel component="legend">Select an option:</FormLabel>
//             <RadioGroup
//               aria-label="option"
//               name="option"
//               value={selectedOption}
//               onChange={(e) => setSelectedOption(e.target.value)}
//             >
//               <FormControlLabel value="tree" control={<Radio />} label="Tree Cover" />
//               <FormControlLabel value="water" control={<Radio />} label="Open Water" />
//               <FormControlLabel value="grassland" control={<Radio />} label="Grassland" />
//             </RadioGroup>
//             <Button variant="contained" color="primary" onClick={handleFormSubmit}>
//               Submit
//             </Button>
//           </FormControl>
//         </DialogContent>
//       </Dialog>

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
//           // ref={smallMapRef}
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
 

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { CircularProgress, Dialog, DialogContent, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@mui/material';
import ProjectList from './ProjectList';
import axios from 'axios';
import { useMapContext } from './MapContext';
import DeckGL from '@deck.gl/react';

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
  const [isDeckGLLoaded, setIsDeckGLLoaded] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const latitude = 40.7128;
  const longitude = -74.0060;
  const center = [longitude, latitude];

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

  const newYorkCityBoundary = [
    [-74.25559, 40.49612],
    [-73.70001, 40.49612],
    [-73.70001, 40.91553],
    [-74.25559, 40.91553],
    [-74.25559, 40.49612],
  ];

  
  const cartoData = {
    type: 'FeatureCollection',
    features: [
     
      {
        type: 'Feature',
        properties: {
          id: 1,
          name: 'Fake Carto Polygon',
          fillColor: [255, 0, 0], 
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-74.0059, 40.7128],
              [-74.0069, 40.7128],
              [-74.0069, 40.7138],
              [-74.0059, 40.7138],
              [-74.0059, 40.7128],
            ],
          ],
        },
      },
      // New polygon covering the extent of New York City
      {
        type: 'Feature',
        properties: {
          id: 2,
          name: 'New York City Boundary',
          fillColor: [255, 0, 0], // <-- Set the initial fill color here (Red)
        },
        geometry: {
          type: 'Polygon',
          coordinates: [newYorkCityBoundary],
        },
      },
    ],
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/mapbox/${selectedBasemap}`,
      center: center,
      zoom: 7,
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

    map.on('load', () => {
      setIsMapLoaded(true);


      addCartoLayerToMap(map, cartoData);

   
      cartoData.features.forEach((feature) => {
        const { id, fillColor } = feature.properties;
        map.setFeatureState(
          { source: 'carto-data', id: id },
          { fillColor: fillColor }
        );
      });
    });

    map.on('draw.create', (e) => {
      console.log('Feature created:', e.features);
      const newFeature = e.features[0];
      setIsFormOpen(true);
      setSelectedPolygon(newFeature);
    });

    drawRef.current = draw;

    return () => {
      map.remove();
    };
  }, [selectedBasemap, drawEnabled]);

  useEffect(() => {
    setIsLoading(!isMapLoaded || !isDeckGLLoaded);
  }, [isMapLoaded, isDeckGLLoaded]);

  const addCartoLayerToMap = (map, data) => {
    if (map.getSource('carto-data')) {
      map.removeLayer('carto-layer');
      map.removeSource('carto-data');
    }

    map.addSource('carto-data', {
      type: 'geojson',
      data: data,
    });

    map.addLayer({
      id: 'carto-layer',
      type: 'fill',
      source: 'carto-data',
      paint: {
        'fill-color': ['get', 'fillColor'], // <-- Use the fillColor property from cartoData
        'fill-opacity': 0.8,
      },
    });
  };

 
  const handleDeckGLLoad = () => {
    setIsDeckGLLoaded(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedOption('');
  };

  const handleFormSubmit = () => {
    
    let fillColor;
    switch (selectedOption) {
      case 'tree':
        fillColor = [0, 255, 0]; // Green
        break;
      case 'water':
        fillColor = [0, 0, 255]; // Blue
        break;
      case 'grassland':
        fillColor = [0, 128, 0]; // Dark green
        break;
      default:
        fillColor = [128, 128, 128]; 
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
          <DeckGL
            viewState={{
              latitude: 40.7128,
              longitude: -74.0060,
              zoom: 13,
            }}
            layers={[]} 
            controller={true}
            onLoad={handleDeckGLLoad} 
          />
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















{/* <DeckGL
        initialViewState={{
          longitude,
          latitude,
          zoom: 13,
          pitch: 0,
          bearing: 0,
          // Add the Mapbox access token here
          accessToken: mapboxgl.accessToken,
        }}
        controller={true}
        layers={[
          // Add CartoLayer with the correct connection object
          new CartoLayer({
            id: 'carto-layer',
            type: MAP_TYPES.TILESET,
            data: 'SELECT * FROM your_carto_table_name',
            connection: {
              apiKey: 'YOUR_CARTO_API_KEY',
              username: 'your_carto_username',
            },
            getFillColor: [255, 0, 0, 100],
            pointRadiusMinPixels: 2,
            pointRadiusMaxPixels: 5,
            autoHighlight: true,
            highlightColor: [0, 0, 128, 128],
            pickable: true,
          }),
          // Add other layers if needed...
        ]}
      ></DeckGL> */}