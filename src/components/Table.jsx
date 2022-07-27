import React from 'react';
import TableRow from './TableRow';
import { StarWarPlanetsContext } from '../context/StarWarPlanetsContext';

export default function Table() {
  const { data } = React.useContext(StarWarPlanetsContext);
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
          data.map((planet) => (
            <TableRow key={ planet.url } planet={ planet } />
          ))
        }
      </tbody>
    </table>
  );
}
