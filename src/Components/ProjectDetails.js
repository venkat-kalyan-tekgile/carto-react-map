import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const ProjectEditForm = () => {
  const history = useNavigate();
  const { projectId } = useParams();

  // You can use the projectId to fetch the project details and populate the form fields if needed.
  // For simplicity, we'll use an empty project object here.
  const initialProject = {
    name: '',
    description: '',
  };

  const [project, setProject] = React.useState(initialProject);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here (e.g., update the project details and navigate back to the map page)
    console.log('Updated Project:', project);
    history.push('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={project.name}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="description"
          label="Description"
          value={project.description}
          onChange={handleInputChange}
          fullWidth
          multiline
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default ProjectEditForm;
