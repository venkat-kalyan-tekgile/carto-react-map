import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useMapContext } from './MapContext';

const MapTabs = () => {
  const { setDrawEnabled } = useMapContext();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Enable draw tools for all tabs
    setDrawEnabled(true);
  };

  return (
    <div>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="AOI" />
        <Tab label="Plan 1" />
        <Tab label="Plan 2" />
        <Tab label="Plan 3" />
      </Tabs>

      {/* Content for AOI tab */}
      {activeTab === 0 && (
        <div>
          <p>Instructions for AOI tab go here.</p>
        </div>
      )}

      {/* Content for Current tab */}
      {activeTab === 1 && (
        <div>
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel htmlFor="current-plan">Select Model</InputLabel>
            <Select
              label="Select Model"
              value={''} // Set the selected value here and handle onChange event
              onChange={() => {}}
              inputProps={{
                name: 'current-plan',
                id: 'current-plan',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {/* Add menu items with your plan options */}
              <MenuItem value="plan1">Plan 1</MenuItem>
              <MenuItem value="plan2">Plan 2</MenuItem>
              {/* Add more plan options as needed */}
            </Select>
          </FormControl>
          <p>Text below the Select Model dropdown for Plan 1 tab.</p>
        </div>
      )}

      {/* Content for Comparison tab */}
      {activeTab === 2 && (
        <div>
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel htmlFor="comparison-plan">Select Model</InputLabel>
            <Select
              label="Select Model"
              value={''} // Set the selected value here and handle onChange event
              onChange={() => {}}
              inputProps={{
                name: 'comparison-plan',
                id: 'comparison-plan',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {/* Add menu items with your plan options */}
              <MenuItem value="plan1">Plan 1</MenuItem>
              <MenuItem value="plan2">Plan 2</MenuItem>
              {/* Add more plan options as needed */}
            </Select>
          </FormControl>
          <p>Text below the Select Model dropdown for Plan 2 tab.</p>
        </div>
      )}

      {activeTab === 3 && (
        <div>
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel htmlFor="comparison-plan">Select Model</InputLabel>
            <Select
              label="Select Model"
              value={''} // Set the selected value here and handle onChange event
              onChange={() => {}}
              inputProps={{
                name: 'comparison-plan',
                id: 'comparison-plan',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {/* Add menu items with your plan options */}
              <MenuItem value="plan1">Plan 1</MenuItem>
              <MenuItem value="plan2">Plan 2</MenuItem>
              {/* Add more plan options as needed */}
            </Select>
          </FormControl>
          <p>Text below the Select Model dropdown for Plan 3 tab.</p>
        </div>
      )}
    </div>
  );
};

export default MapTabs;
