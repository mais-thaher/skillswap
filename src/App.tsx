import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './app/routes/AppRoutes';
import './App.css';

function App(): React.ReactElement {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
