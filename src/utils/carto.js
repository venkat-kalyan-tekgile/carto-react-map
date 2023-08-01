import axios from 'axios';

export const addCartoLayer = (map, setIsLoading) => {
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