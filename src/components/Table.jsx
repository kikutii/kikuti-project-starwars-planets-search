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

  // agradecimentos ao marcelo de lima
  // me ajudou a arrumar um bug que não estava conseguindo arrumar :)
  // https://github.com/Maarceloo
  const filtro = (filter, newFilteredData) => {
    const { column, comparison, value } = filter;
    return (
      newFilteredData.filter((planet) => {
        if (comparison === 'maior que') {
          return Number(planet[column]) > Number(value);
        }
        if (comparison === 'menor que') {
          return Number(planet[column]) < Number(value);
        }
        return Number(planet[column]) === Number(value);
      })
    );
  };

  useEffect(() => {
    if (filterByNumericValues.length) {
      let newFilteredData = data;
      filterByNumericValues.forEach((filter) => {
        newFilteredData = filtro(filter, newFilteredData);
      });
      setFilteredData(newFilteredData);
    } else {
      setFilteredData(data);
    }
  }, [filterByNumericValues]);

  return (
    <table data-testid="table">
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
