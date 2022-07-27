import React, { useContext } from 'react';
import { StarWarPlanetsContext } from '../context/StarWarPlanetsContext';

export default function Filters() {
  const { filters, setFilters } = useContext(StarWarPlanetsContext);

  const handleChange = ({ target: { value } }) => {
    setFilters((prevState) => ({ ...prevState, filterByName: value }));
  };

  return (
    <label htmlFor="filterSearch">
      Projeto Star Wars - Trybe
      <br />
      <input
        id="filterSearch"
        type="text"
        data-testid="name-filter"
        value={ filters.filterByName }
        onChange={ handleChange }
      />
    </label>
  );
}
