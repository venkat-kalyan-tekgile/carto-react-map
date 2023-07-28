import React from 'react';
import AppRouter from './AppRouter';
import Navbar from './Components/Navbar';

const username = 'Venkat';

function App() {
  return (
    <div>
      <Navbar username={username} /> 
      <AppRouter />
    </div>
  );
}

export default App;
