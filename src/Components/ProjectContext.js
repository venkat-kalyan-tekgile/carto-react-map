import React, { createContext, useContext, useState } from 'react';

const ProjectsContext = createContext();

export const useProjectsContext = () => useContext(ProjectsContext);

export const ProjectsProvider = ({ children }) => {
  const [projectsData, setProjectsData] = useState([]);
  const updateProjects = (newProjects) => {
    console.log('new', newProjects)
    setProjectsData(newProjects);
  };

  return (
    <ProjectsContext.Provider value={{ projectsData, updateProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
