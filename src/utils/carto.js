// import axios from 'axios';
// import { setClient } from '@carto/react-core/src/utils/clientParameter';
// import { CartoLayer } from '@deck.gl/carto/typed';

// export const addCartoLayer = (map, setIsLoading) => {
//     const CARTO_USERNAME = 'attainutbs@gmail.com';
//     const CARTO_APIKEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfMWg2eGQxc2MiLCJqdGkiOiIwNDcxMjlkYiJ9.qdrpqYggDrYqaO1Oher5_lQn1pYy8TYdywexIm8cCGg'; // You need an API key for your CARTO account
//     const CARTO_DATASET = 'cell_towers_worldwide';

//     const sqlQuery = `SELECT * FROM ${CARTO_DATASET}`;
//     const cartoUrl = `https://${CARTO_USERNAME}.carto.com/api/v3/sql?q=${sqlQuery}`;

//     axios
//       .get(cartoUrl, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `ApiKey ${CARTO_APIKEY}`,
//         },
//       })
//       .then((response) => {
//         const data = response.data;
//         const geojson = {
//           type: 'FeatureCollection',
//           features: data.rows.map((row) => ({
//             type: 'Feature',
//             properties: row,
//             geometry: JSON.parse(row.the_geom),
//           })),
//         };

//         map.addSource('carto-source', {
//           type: 'geojson',
//           data: geojson,
//         });

//         map.addLayer({
//           id: 'carto-layer',
//           type: 'circle',
//           source: 'carto-source',
//           paint: {
//             'circle-color': 'red',
//             'circle-radius': 6,
//             'circle-stroke-width': 1,
//             'circle-stroke-color': '#fff',
//           },
//         });

//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching data from CARTO:', error);
//         setIsLoading(false);
//       });
//   };

// import React from 'react';
// import { setClient } from '@carto/react-core/src/utils/clientParameter';
// import { CartoLayer } from '@deck.gl/carto/typed';

//     const CARTO_USERNAME = 'attainutbs@gmail.com';
//     const CARTO_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfMWg2eGQxc2MiLCJqdGkiOiIwNDcxMjlkYiJ9.qdrpqYggDrYqaO1Oher5_lQn1pYy8TYdywexIm8cCGg'; // You need an API key for your CARTO account

// setClient(CARTO_USERNAME, CARTO_API_KEY);

// const CartoLayerComponent = () => {
//   const cartoLayerConfig = {
//     credentials: {
//       apiKey: CARTO_API_KEY,
//       username: CARTO_USERNAME,
//       serverUrlTemplate: 'https://{user}.carto.com',
//     },
//     layerSource: {
//       id: 'cell_towers_layer', // This is the layer ID you will use to add it to the map
//       data: 'cell_towers_worldwide', // Table name from Carto
//     },
//     isVisible: true, // Set this to false if you want to hide the layer initially
//   };

//   return <CartoLayer {...cartoLayerConfig} />;
// };

// export default CartoLayerComponent;


// import React from 'react';
// import { setClient } from '@carto/react-core/src/utils/clientParameter';
// import { DeckGL } from '@deck.gl/react';
// import { CartoLayer } from '@deck.gl/carto/typed';

// const CARTO_USERNAME = 'attainutbs@gmail.com';
//     const CARTO_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfMWg2eGQxc2MiLCJqdGkiOiIwNDcxMjlkYiJ9.qdrpqYggDrYqaO1Oher5_lQn1pYy8TYdywexIm8cCGg';

// setClient(CARTO_USERNAME, CARTO_API_KEY);

// const CartoLayerComponent = () => {
//   const cartoLayerConfig = {
//     credentials: {
//       apiKey: CARTO_API_KEY,
//       username: CARTO_USERNAME,
//       serverUrlTemplate: 'https://{user}.carto.com',
//     },
//     layerSource: {
//       id: 'cell_towers_layer', // This is the layer ID you will use to add it to the map
//       data: 'cell_towers_worldwide', // Table name from Carto
//     },
//     isVisible: true, // Set this to false if you want to hide the layer initially
//   };

//   return (
//     <DeckGL
//       initialViewState={{
//         latitude: 40.7128,
//         longitude: -74.0060,
//         zoom: 13,
//       }}
//       controller={true}
//       layers={[new CartoLayer(cartoLayerConfig)]}
//     />
//   );
// };

// export default CartoLayerComponent;


// import React from 'react';
// import { setDefaultCredentials } from '@deck.gl/carto';
// import { DeckGL } from '@deck.gl/react';
// import { CartoLayer } from '@deck.gl/carto/typed';

// const CARTO_USERNAME = 'attainutbs@gmail.com';
//     const CARTO_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfMWg2eGQxc2MiLCJqdGkiOiIwNDcxMjlkYiJ9.qdrpqYggDrYqaO1Oher5_lQn1pYy8TYdywexIm8cCGg';

// setDefaultCredentials({
//   apiKey: CARTO_API_KEY,
//   username: CARTO_USERNAME,
// });


// const CartoLayerComponent = () => {
//   const cartoLayerConfig = {
//     data: 'cell_towers_worldwide', // Table name from Carto
//     credentials: {
//       serverUrl: 'https://YOUR_CARTO_USERNAME.carto.com', // Replace YOUR_CARTO_USERNAME with your Carto username
//     },
//     isVisible: true, // Set this to false if you want to hide the layer initially
//   };

//   return (
//     <DeckGL
//       initialViewState={{
//         latitude: 40.7128,
//         longitude: -74.0060,
//         zoom: 13,
//       }}
//       controller={true}
//       layers={[new CartoLayer(cartoLayerConfig)]}
//     />
//   );
// };

// export default CartoLayerComponent;

import axios from 'axios';

async function generateCartoToken() {
  try {
    const tokenData = {
      grants: [
        {
          connection_name: 'carto_dw',
          source: '`carto-demo-data`.demo_tables.airports',
        },
      ],
      referers: [],
      allowed_apis: ['sql', 'maps'],
    };

    const tokenConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://gcp-us-east1.api.carto.com/v3/tokens',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfMWg2eGQxc2MiLCJqdGkiOiIwNDcxMjlkYiJ9.qdrpqYggDrYqaO1Oher5_lQn1pYy8TYdywexIm8cCGg',
      },
      data: JSON.stringify(tokenData),
    };

    const tokenResponse = await axios(tokenConfig);

    return tokenResponse.data?.token;
  } catch (error) {
    console.log('Error generating Carto API token:', error);
    return null;
  }
}



async function fetchCartoData(cartoToken, setCartoData) {
  try {
    const fetchDataConfig = {
      method: 'get',
      url:
        'https://gcp-us-east1.api.carto.com/v3/sql/carto_dw/query?q=select * from carto-demo-data.demo_tilesets.covid19_vaccinated_usa_tileset',
      headers: {
        Authorization: `Bearer ${cartoToken}`,
      },
    };

    const response = await axios(fetchDataConfig);

    const features = response.data.rows.map((row) => ({
      type: 'Feature',
      properties: {
        id: row.cartodb_id,
        name: row.name,
        fillColor: [255, 0, 0], // Set the initial fill color here (Red)
      },
      geometry: JSON.parse(row.the_geom),
    }));

    console.log('carto', response.data);

    setCartoData({
      type: 'FeatureCollection',
      features: features,
    });
  } catch (error) {
    console.log('Error fetching data from Carto:', error);
  }
}


export {
  generateCartoToken,
  fetchCartoData
}