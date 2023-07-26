import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ProjectEditForm = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  
  const planOptions = ['Plan A', 'Plan B', 'Plan C'];
  const modelOptions = ['Model X', 'Model Y', 'Model Z'];
  const parameterOptions = ['Parameter 1', 'Parameter 2', 'Parameter 3'];

  const initialProject = {
    name: '',
    description: '',
    selectedPlan: '',
    selectedModel: '',
    selectedParameter: '',
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
      <Button onClick={handleBackClick} variant="contained" style={{ marginBottom: '10px' }}>
        Back
      </Button>
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
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Select Plan</InputLabel>
          <Select
            name="selectedPlan"
            value={project.selectedPlan}
            onChange={handleInputChange}
          >
            {planOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Select Model</InputLabel>
          <Select
            name="selectedModel"
            value={project.selectedModel}
            onChange={handleInputChange}
          >
            {modelOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Select Parameters</InputLabel>
          <Select
            name="selectedParameter"
            value={project.selectedParameter}
            onChange={handleInputChange}
          >
            {parameterOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default ProjectEditForm;
