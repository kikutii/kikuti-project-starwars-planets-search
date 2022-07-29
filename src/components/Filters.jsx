import React, { useContext, useState, useEffect } from 'react';
import { StarWarPlanetsContext } from '../context/StarWarPlanetsContext';
import ButtonRemoveFilter from './ButtonRemoveFilter';

export default function Filters() {
  const {
    filters: { filterByName, filterByNumericValues },
    setFilters,
    columns,
    setColumns,
    initialStateColumn,
  } = useContext(StarWarPlanetsContext);

  const initialState = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  };

  const [filtersSelected, setFiltersSelected] = useState(initialState);

  const operators = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const handleChange = ({ target: { id, value } }) => {
    if (id === 'search') {
      setFilters((prevState) => ({ ...prevState, filterByName: value }));
    } else {
      setFiltersSelected((prevState) => ({ ...prevState, [id]: value }));
    }
  };

  const handleFilter = () => {
    if (filtersSelected.column) {
      setColumns(columns.filter((column) => (
        column !== filtersSelected.column
      )));
      setFilters((prevState) => (
        {
          ...prevState,
          filterByNumericValues: [
            ...prevState.filterByNumericValues, filtersSelected,
          ],
        }
      ));
    }
  };

  useEffect(() => {
    if (columns[0]) {
      setFiltersSelected((prevState) => (
        { ...prevState, column: columns[0] }
      ));
    } else {
      setFiltersSelected((prevState) => ({ ...prevState, column: '' }));
    }
  }, [columns]);

  const handleRemoveAllFilters = () => {
    setColumns(initialStateColumn);
    setFilters((prevState) => ({ ...prevState, filterByNumericValues: [] }));
  };

  return (
    <header data-testid="filters">
      <label htmlFor="search">
        Projeto Star Wars - Trybe
        <br />
        <input
          id="search"
          type="text"
          data-testid="name-filter"
          value={ filterByName }
          onChange={ handleChange }
        />
      </label>
      <section>
        <label htmlFor="column">
          Column
          <select
            id="column"
            data-testid="column-filter"
            onChange={ handleChange }
          >
            {
              columns.map((column) => (
                <option key={ column } value={ column }>{column}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="comparison">
          Operator
          <select
            id="comparison"
            data-testid="comparison-filter"
            onChange={ handleChange }
          >
            {
              operators.map((operator) => (
                <option
                  key={ operator }
                  value={ operator }
                >
                  {operator}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="value">
          Number
          <input
            id="value"
            type="number"
            value={ filtersSelected.value }
            data-testid="value-filter"
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilter }
        >
          FILTER
        </button>
      </section>

      {
        filterByNumericValues.map(({ column, comparison, value }) => (
          <ButtonRemoveFilter
            key={ column }
            column={ column }
            comparison={ comparison }
            value={ value }
          />
        ))
      }
      <button
        type="button"
        onClick={ handleRemoveAllFilters }
        data-testid="button-remove-filters"
      >
        Remove All Filters
      </button>
    </header>
  );
}
