import React, { useEffect } from 'react';
import TableRow from './TableRow';
import { StarWarPlanetsContext } from '../context/StarWarPlanetsContext';

export default function Table() {
  const {
    data,
    filteredData,
    setFilteredData,
    filters: { filterByName, filterByNumericValues },
  } = React.useContext(StarWarPlanetsContext);

  useEffect(() => {
    if (filterByName) {
      const newFilteredData = data.filter((planet) => (
        planet.name.includes(filterByName)
      ));
      return setFilteredData(newFilteredData);
    }
    // se o filterByName estiver vazio ele reseta o filtro
    setFilteredData(data);
  }, [filterByName]);

  useEffect(() => {
    if (filterByNumericValues.length > 1) {
      const {
        column,
        comparison,
        value,
      } = filterByNumericValues[filterByNumericValues.length - 1];

      const newFilteredData = (
        filteredData.filter((planet) => {
          if (comparison === 'maior que') {
            console.log(comparison, column, value);
            return Number(planet[column]) > Number(value);
          }
          if (comparison === 'menor que') {
            return Number(planet[column]) < Number(value);
          }
          return Number(planet[column]) === Number(value);
        })
      );
      setFilteredData(newFilteredData);
    }
  }, [filterByNumericValues]);

  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
        {
          filteredData.map((planet) => (
            <TableRow key={ planet.url } planet={ planet } />
          ))
        }
      </tbody>
    </table>
  );
}
