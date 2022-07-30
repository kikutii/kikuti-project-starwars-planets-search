import React from 'react';
import PropTypes from 'prop-types';
import useData from '../hooks/useData';
import useFilters from '../hooks/useFilters';
import Loading from '../components/Loading';

export const StarWarPlanetsContext = React.createContext();

export function StarWarPlanetsProvider({ children }) {
  // esse data retorna os planets, a trybe exige que o nome da variável seja "data"
  const [data, filteredData, setFilteredData] = useData();
  const [filters, setFilters] = useFilters();

  const initialStateColumn = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [columns, setColumns] = React.useState(initialStateColumn);

  const initialState = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  };

  const [filtersSelected, setFiltersSelected] = React.useState(initialState);

  const context = {
    data,
    filteredData,
    filters,
    columns,
    filtersSelected,
    setFilters,
    setFilteredData,
    setColumns,
    setFiltersSelected,
    initialStateColumn,
  };

  return (
    <StarWarPlanetsContext.Provider value={ context }>
      { data.length ? children : <Loading />}
    </StarWarPlanetsContext.Provider>
  );
}

StarWarPlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
