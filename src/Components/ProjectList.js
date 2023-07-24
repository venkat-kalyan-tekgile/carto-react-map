import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemButton, Divider, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';


const ProjectList = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleClick = (project) => {
    setSelectedProject(project);
    setSettingsOpen(true);
  };

  const handleEdit = (projectId) => {
    // Handle edit action here (e.g., navigate to the project edit page)
    console.log(`Edit project ${projectId}`);
  };

  const handleSettings = (project) => {
    setSelectedProject(project);
    setSettingsOpen(true);
  };

  return (
    <List component="nav">
      <ListItemButton>
        <Button variant="contained" color="primary" fullWidth>
          Create
        </Button>
      </ListItemButton>
      <Divider />
      {projects.map((project) => (
        <React.Fragment key={project.id}>
          <ListItem>
            <ListItemText primary={project.name} />
            <IconButton onClick={() => handleEdit(project.id)} edge="end" aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleSettings(project)} edge="end" aria-label="settings">
              <SettingsIcon />
            </IconButton>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
      
    </List>
  );
};

export default ProjectList;
