

import axios from 'axios';

async function generateCartoToken() {
  const optionsMaster = {
      headers: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams({
          audience: 'carto-cloud-native-api',
          client_id: 'e9YD22g5mtXV6wLh8dYgBk369DnKLxU7',
          client_secret: 'uKPFOENM3L8m7gi7uPUFH4_eKtdKDut0ORkKegShe54CSbJfc81G2o4uL2bT_2hW',
          grant_type: 'client_credentials'
      }),
      method: 'POST',
      url: 'https://auth.carto.com/oauth/token'
  };

  try {
      const response = await axios(optionsMaster);
      const result = response.data;
      const accessToken = result.access_token; // Update the access token
      console.log('token', accessToken);
  } catch (error) {
      console.log(error);
  }
}



async function fetchCartoData(cartoToken, setCartoData) {
  try {
    const fetchDataConfig = {
      method: 'get',
      url:
        'https://gcp-asia-northeast1.api.carto.com/v3/sql/carto_dw/query?q=SELECT ST_X(ST_Centroid(geom)) as lon , ST_Y(ST_Centroid(geom)) as lat, cartodb_id, name, description, status FROM carto-dw-ac-moe5kln.shared.ue_net_projects  WHERE 1=1',
      headers: {
        Authorization: `Bearer ${cartoToken}`,
      },
    };

    const response = await axios(fetchDataConfig);

    const cartoFeatures = response.data.rows;
    // console.log('carto layer', response.data.rows);
    
    const cartoGeoJSON = {
      type: 'FeatureCollection',
      features: cartoFeatures.map(feature => ({
        type: 'Feature',
        properties: {
          fillColor: 'red', // Set the fill color for red dots
          id: feature.cartodb_id, // Use the unique identifier from your data
          name: feature.name
        },
        geometry: {
          type: 'Point',
          coordinates: [feature.lon, feature.lat], 
        },
      })),
    };
    // console.log('carto data', cartoGeoJSON);

    setCartoData(cartoGeoJSON);
  } catch (error) {
    console.log('Error fetching data from Carto:', error);
  }
}


async function fetchProjects(cartoToken, updateProjects) {
  try {
    const fetchDataConfig = {
      method: 'get',
      url:
        'https://gcp-asia-northeast1.api.carto.com/v3/sql/carto_dw/query?q=select * from carto-dw-ac-moe5kln.shared.ue_net_projects',
      headers: {
        Authorization: `Bearer ${cartoToken}`,
      },
    };

    const response = await axios(fetchDataConfig);
    updateProjects(response.data.rows)
    // console.log('carto', response.data.rows);
  } catch (error) {
    console.log('Error fetching data from Carto:', error);
  }
}

export {
  generateCartoToken,
  fetchProjects,
  fetchCartoData
}