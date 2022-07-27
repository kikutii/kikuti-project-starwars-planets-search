import React, { useEffect } from 'react';
import TableRow from './TableRow';
import { StarWarPlanetsContext } from '../context/StarWarPlanetsContext';

export default function Table() {
  const {
    data,
    filteredData,
    setFilteredData,
    filters,
  } = React.useContext(StarWarPlanetsContext);

  useEffect(() => {
    if (filters.filterByName) {
      const newFilteredData = data.filter((planet) => (
        planet.name.includes(filters.filterByName)
      ));
      return setFilteredData(newFilteredData);
    }
    // se o filterByName estiver vazio ele reseta o filtro
    setFilteredData(data);
  }, [filters.filterByName]);

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
