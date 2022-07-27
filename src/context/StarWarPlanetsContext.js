import React from 'react';
import PropTypes from 'prop-types';
import useData from '../hooks/useData';
import Loading from '../components/Loading';

export const StarWarPlanetsContext = React.createContext();

export function StarWarPlanetsProvider({ children }) {
  // esse data retorna os planets, a trybe exige que o nome da variável seja "data"
  const data = useData();

  const context = {
    data,
  };

  return (
    <StarWarPlanetsContext.Provider value={ context }>
      {
        data.length ? children : <Loading />
      }
    </StarWarPlanetsContext.Provider>
  );
}

StarWarPlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
