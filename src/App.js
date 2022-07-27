import React from 'react';
import './App.css';
import Table from './components/Table';
import { StarWarPlanetsProvider } from './context/StarWarPlanetsContext';

function App() {
  return (
    <StarWarPlanetsProvider>
      <Table />
    </StarWarPlanetsProvider>
  );
}

export default App;
