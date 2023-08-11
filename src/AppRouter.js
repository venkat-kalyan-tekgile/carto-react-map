import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapComponent from './Components/Map/Map';
import EditPageWithMap from './Pages/EditPageWithMap';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/"  element={<MapComponent showProjectList={true} />} />
        <Route exact path="/edit/:projectId" element={<EditPageWithMap/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
