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
import Navbar from './Navbar';
import { CircularProgress } from '@mui/material';
import ProjectList from './ProjectList';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1IjoidmVua2F0a2FseWFuIiwiYSI6ImNsa2trazd0bTA0eGkzcm9lZG9ieHQwMG8ifQ.-8uxfBRQZHGBtLaK6egPvQ';

const MapComponent = ({ showProjectList }) => {
  const mapContainerRef = useRef(null);
  const drawRef = useRef(null);
  // const smallMapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBasemap, setSelectedBasemap] = useState('streets-v11');

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

  // const createSmallMap = () => {
  //   return new mapboxgl.Map({
  //     container: smallMapRef.current,
  //     style: `mapbox://styles/mapbox/${selectedBasemap}`, // Use the selected basemap
  //     center: center,
  //     zoom: 10,
  //     interactive: false, 
  //   });
  // };

  // const addCartoLayer = (map) => {
  //   // CARTO Credentials
  //   const CARTO_USERNAME = 'attainutbs@gmail.com';
  //   const CARTO_APIKEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfMWg2eGQxc2MiLCJqdGkiOiIwNDcxMjlkYiJ9.qdrpqYggDrYqaO1Oher5_lQn1pYy8TYdywexIm8cCGg'; // You need an API key for your CARTO account
  //   const CARTO_DATASET = 'cell_towers_worldwide';

  //   const sqlQuery = `SELECT * FROM ${CARTO_DATASET}`;
  //   const url = `https://${CARTO_USERNAME}.carto.com/api/v3/sql?q=${encodeURIComponent(sqlQuery)}&api_key=${CARTO_APIKEY}`;

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const geoJSONData = {
  //         type: 'FeatureCollection',
  //         features: data.rows.map((row) => ({
  //           type: 'Feature',
  //           geometry: JSON.parse(row.the_geom),
  //           properties: { ...row },
  //         })),
  //       };

  //       map.addSource('carto-layer-source', {
  //         type: 'geojson',
  //         data: geoJSONData,
  //       });

  //       map.addLayer({
  //         id: 'carto-layer',
  //         type: 'circle',
  //         source: 'carto-layer-source',
  //         paint: {
  //           'circle-radius': 5,
  //           'circle-color': 'red',
  //         },
  //       });

  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data from CARTO:', error);
  //       setIsLoading(false);
  //     });
  // };

  const addCartoLayer = (map) => {
        const CARTO_USERNAME = 'attainutbs@gmail.com';
    const CARTO_APIKEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfMWg2eGQxc2MiLCJqdGkiOiIwNDcxMjlkYiJ9.qdrpqYggDrYqaO1Oher5_lQn1pYy8TYdywexIm8cCGg'; // You need an API key for your CARTO account
    const CARTO_DATASET = 'cell_towers_worldwide';

    const sqlQuery = `SELECT * FROM ${CARTO_DATASET}`;
    const cartoUrl = `https://${CARTO_USERNAME}.carto.com/api/v3/sql?q=${sqlQuery}`;

    axios
      .get(cartoUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `ApiKey ${CARTO_APIKEY}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const geojson = {
          type: 'FeatureCollection',
          features: data.rows.map((row) => ({
            type: 'Feature',
            properties: row,
            geometry: JSON.parse(row.the_geom),
          })),
        };

        map.addSource('carto-source', {
          type: 'geojson',
          data: geojson,
        });

        map.addLayer({
          id: 'carto-layer',
          type: 'circle',
          source: 'carto-source',
          paint: {
            'circle-color': 'red',
            'circle-radius': 6,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff',
          },
        });

        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data from CARTO:', error);
        setIsLoading(false);
      });
  };

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
      // Call the function to add the CARTO layer
      addCartoLayer(map);
    });

    drawRef.current = draw;

    return () => {
      map.remove();
      // if (smallMapRef.current) {
      //   smallMapRef.current.remove();
      // }
    };
  }, [center, selectedBasemap]);

  // useEffect(() => {
  //   if (!isLoading) {
  //     const smallMap = createSmallMap();

  //     return () => {
  //       if (smallMap) smallMap.remove();
  //     };
  //   }
  // }, [isLoading, selectedBasemap]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* {showProjectList && (
          <Navbar username={username} /> 
        )} */}
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





