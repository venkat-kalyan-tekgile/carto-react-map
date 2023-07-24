import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemButton, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects }) => {
  // const [selectedProject, setSelectedProject] = useState(null);
  // const [settingsOpen, setSettingsOpen] = useState(false);

  const handleDoubleClick = (projectId) => {
   
    console.log(`Double-clicked on project ${projectId}`);
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
          <ListItem onDoubleClick={() => handleDoubleClick(project.id)}>
            <Link to={`/edit/${project.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              <ListItemText primary={project.name} />
            </Link>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default ProjectList;
