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

  const context = {
    data,
    filteredData,
    filters,
    setFilters,
    setFilteredData,
  };

  return (
    <StarWarPlanetsContext.Provider value={ context }>
      {
        filteredData.length ? children : <Loading />
      }
    </StarWarPlanetsContext.Provider>
  );
}

StarWarPlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
