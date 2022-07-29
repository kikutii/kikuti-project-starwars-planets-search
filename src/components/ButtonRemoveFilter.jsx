import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StarWarPlanetsContext } from '../context/StarWarPlanetsContext';

export default function ButtonRemoveFilter({ column, comparison, value }) {
  const {
    filters: { filterByNumericValues },
    setFilters,
    setColumns,
  } = useContext(StarWarPlanetsContext);

  const handleClick = ({ target }) => {
    const newFilters = filterByNumericValues.filter((filter) => (
      filter.column !== target.value
    ));
    setColumns((prevState) => [...prevState, target.value]);
    setFilters((prevState) => ({ ...prevState, filterByNumericValues: newFilters }));
  };

  return (
    <div data-testid="filter">
      <br />
      <span>
        {`${column} ${comparison} ${value}`}
      </span>
      <button
        type="button"
        value={ column }
        data-testid="removeFilterBtn"
        onClick={ handleClick }
      >
        Remove
      </button>
    </div>
  );
}

ButtonRemoveFilter.propTypes = {
  column: PropTypes.string.isRequired,
  comparison: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
