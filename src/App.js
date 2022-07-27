import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import { StarWarPlanetsProvider } from './context/StarWarPlanetsContext';

function App() {
  return (
    <StarWarPlanetsProvider>
      <Filters />
      <Table />
    </StarWarPlanetsProvider>
  );
}

export default App;
