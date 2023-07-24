import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapComponent from './Components/Map';
import ProjectEditForm from './Components/ProjectDetails';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/"  element={<MapComponent/>} />
        <Route exact path="/edit/:projectId"  element={<ProjectEditForm/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
