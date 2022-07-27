import React, { useContext, useState, useEffect } from 'react';
import { StarWarPlanetsContext } from '../context/StarWarPlanetsContext';

export default function Filters() {
  const {
    filters: { filterByName },
    setFilters,
  } = useContext(StarWarPlanetsContext);

  const initialState = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  };

  const [filtersSelected, setFiltersSelected] = useState(initialState);

  const initialStateColumn = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [columns, setColumns] = useState(initialStateColumn);

  const operators = [
    'maior que',
    'menor que',
    'igual a',
  ];

  // apenas monitora pra mim os filtros selecionados
  useEffect(() => {
    console.log(filtersSelected);
  }, [filtersSelected]);

  const handleChange = ({ target: { id, value } }) => {
    if (id === 'search') {
      console.log(id, value);
      setFilters((prevState) => ({ ...prevState, filterByName: value }));
    } else {
      setFiltersSelected((prevState) => ({ ...prevState, [id]: value }));
    }
  };

  const handleFilter = () => {
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
    // pega o value do primeiro item do select column
    const firstColumn = document.getElementById('column')[0].value;
    setFiltersSelected((prevState) => ({ ...prevState, column: firstColumn }));
  };

  return (
    <header>
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
    </header>
  );
}
