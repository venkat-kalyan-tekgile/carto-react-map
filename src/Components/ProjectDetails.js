import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProjectEditForm = ({projects}) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  console.log("pro", projects);

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

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Project:', project);
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={handleBackClick} variant="text" startIcon={<ArrowBackIcon />} style={{ marginBottom: '10px' }}>
        Back
      </Button>
      <h2>{projects.name}</h2>
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
