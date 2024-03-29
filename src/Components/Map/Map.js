
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { CircularProgress, Dialog, DialogContent, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@mui/material';

import { useMapContext } from '../../Context/MapContext';
import DeckGL from '@deck.gl/react';
import { NavigationControl } from 'mapbox-gl';
import { useProjectsContext } from '../../Context/ProjectContext';
import { generateCartoToken, fetchCartoData , fetchProjects} from '../../utils/carto';

mapboxgl.accessToken = 'pk.eyJ1IjoidmVua2F0a2FseWFuIiwiYSI6ImNsa2trazd0bTA0eGkzcm9lZG9ieHQwMG8ifQ.-8uxfBRQZHGBtLaK6egPvQ';
const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000; 

const MapComponent = ({ showProjectList }) => {
  const mapContainerRef = useRef(null);
  const drawRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBasemap, setSelectedBasemap] = useState('streets-v11');
  const { drawEnabled } = useMapContext();
  const { updateProjects } = useProjectsContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [cartoToken, setCartoToken] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(0);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [isDeckGLLoaded, setIsDeckGLLoaded] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [projects, setProjects] = useState([])
  const [cartoData, setCartoData] = useState();

  const center = [139.7670395118941, 35.68334155120243];

  const basemaps = [
    { id: 'streets-v11', name: 'Streets', image: '/path-to-streets-image.png' },
    { id: 'satellite-v9', name: 'Satellite', image: '/path-to-satellite-image.png' },
    // Add more basemaps as needed
  ];

  

  

  // async function fetchProjectsWithToken(token) {
  //   fetchProjects(token, setProjects);
  // }

  // async function fetchData() {
  //   if (cartoToken && Date.now() < tokenExpiration) {
  //     // Use the existing token if it's valid
  //     fetchProjectsWithToken(cartoToken);
  //   } else {
  //     // Generate a new token and update the token state
  //     const newToken = await generateCartoToken();
  //     if (newToken) {
  //       setCartoToken(newToken);
  //       setTokenExpiration(Date.now() + TOKEN_EXPIRATION_TIME);
  //       fetchProjectsWithToken(newToken);
  //     }
  //   }
  // }

  useEffect(() => {
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRVNGNZTHAwaThjYnVMNkd0LTE0diJ9.eyJodHRwOi8vYXBwLmNhcnRvLmNvbS9hY2NvdW50X2lkIjoiYWNfbW9lNWtsbiIsImh0dHA6Ly9hcHAuY2FydG8uY29tL2FjdGluZ19hcyI6ImF1dGgwfDYxNWJhYTJmZjVhNDAzMDA2OGE5YTBjMiIsImlzcyI6Imh0dHBzOi8vYXV0aC5jYXJ0by5jb20vIiwic3ViIjoiZTlZRDIyZzVtdFhWNndMaDhkWWdCazM2OURuS0x4VTdAY2xpZW50cyIsImF1ZCI6ImNhcnRvLWNsb3VkLW5hdGl2ZS1hcGkiLCJpYXQiOjE2OTM3OTk3ODksImV4cCI6MTY5Mzg4NjE4OSwiYXpwIjoiZTlZRDIyZzVtdFhWNndMaDhkWWdCazM2OURuS0x4VTciLCJzY29wZSI6InJlYWQ6dG9rZW5zIHdyaXRlOnRva2VucyByZWFkOmltcG9ydHMgd3JpdGU6aW1wb3J0cyByZWFkOmNvbm5lY3Rpb25zIHdyaXRlOmNvbm5lY3Rpb25zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwicGVybWlzc2lvbnMiOlsicmVhZDp0b2tlbnMiLCJ3cml0ZTp0b2tlbnMiLCJyZWFkOmltcG9ydHMiLCJ3cml0ZTppbXBvcnRzIiwicmVhZDpjb25uZWN0aW9ucyIsIndyaXRlOmNvbm5lY3Rpb25zIl19.EZgSybRnctShWE-cU9Gs7ckX9Pgtr4e-sxbzd7Gb_P7MdjNBTVO0XaTNPkzwWhK5EeCHg6N0JKjLb3ULqHk3AyX0PAwtdJzoy9RYD-Lci7UEjlDIj5upRz93mnb3J-aa5BahOIo2zt9xJ3GBuS7v3uaghW0id808h_8n5vOIge69BuxNv5HPnifFMC8V_uhWhImy8uxnfTik-CAzNQSOdAT3H7SyiLWbSOu7w3NOaf4iuKe9-hJ8hR-qniyTj923iSK6TfYIHvORF2_CDptAJJwvaZmxDs18TPC-OIOBbwlfeXosI99atmt6IDeBxlBpq-Qxjd66Z1rJtmgidfP3vQ'
    fetchProjects(token, updateProjects);
    fetchCartoData(token, setCartoData)
  }, []);
  

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/mapbox/${selectedBasemap}`,
      center: center,
      zoom: 7,
    });

    const navControl = new NavigationControl();
    map.addControl(navControl, 'top-left');

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

      if (cartoData) {
        addCartoLayerToMap(map, cartoData);

        cartoData.features.forEach((feature) => {
          const { id, fillColor } = feature.properties;
          map.setFeatureState(
            { source: 'carto-data', id: id },
            { fillColor: fillColor }
          );
        });
      }
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
  }, [selectedBasemap, drawEnabled, cartoData]);

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
      type: 'circle',
      source: 'carto-data',
      paint: {
        'circle-color': ['get', 'fillColor'], // Use the fillColor property from cartoData
        'circle-radius': 12,
        'circle-opacity': 0.8,
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
       <div
      ref={mapContainerRef}
      style={{ flex: '1', position: 'relative', overflow: 'hidden' }}
    >
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
    bottom: '10px',
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
      </div>
    </div>
  );
};

export default MapComponent;