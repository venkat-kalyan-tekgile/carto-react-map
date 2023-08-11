import React from 'react';
import { List, ListItem, ListItemText, ListItemButton, Divider, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useProjectsContext } from '../../Context/ProjectContext';



const ProjectList = ({ projects }) => {
  const { setProjectsData } = useProjectsContext();
  const { updateProjects } = useProjectsContext();
  const handleDoubleClick = (projectId) => {
    console.log(`Double-clicked on project ${projectId}`);
    updateProjects(projectId); 
    
  };
  

  return (
    <Grid container direction="column" spacing={2} style={{ flexGrow: 1, overflowY: 'auto' }}>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/create"
          style={{ marginTop: '10px', borderRadius: '20px', width: 'fit-content', padding: '8px 16px' }}
        >
          <AddIcon style={{ marginRight: '8px' }} />
          Add Project
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {projects.map((project, index) => (
        <React.Fragment key={project.cartodb_id}>
          <Grid item xs={12}>
            <ListItem
              onClick={() => handleDoubleClick(project)}
              disablePadding
              style={{ borderBottom: index !== projects.length - 1 ? '1px solid #ccc' : 'none' }}
            >
              <ListItemButton component={Link} to={`/edit/${project.cartodb_id}`} style={{ textDecoration: 'none' }}>
                <ListItemText primary={project.name} />
              </ListItemButton>
            </ListItem>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default ProjectList;
