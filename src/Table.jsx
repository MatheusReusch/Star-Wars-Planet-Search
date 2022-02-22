import React, { useContext, useEffect, useState } from 'react';
import planetsContext from './planetsContext';

function Table() {
  const { data, filters } = useContext(planetsContext);
  const nameFilter = filters.filterByName.name;
  const otherFilters = filters.filterByNumericValues;
  const NEGATIVE_VALUE = -1;
  const POSITVE_VALUE = 1;
  const NEUTRAL_VALUE = 0;

  const [data2, setData2] = useState([]);

  useEffect(() => {
    if (filters.order.sort === 'ASC' && data.length > 0) {
      setData2(data.sort((element, elementTwo) => {
        if (element.name < elementTwo.name) {
          return NEGATIVE_VALUE;
        }
        if (element.name > elementTwo.name) {
          return POSITVE_VALUE;
        }
        return NEUTRAL_VALUE;
      }));
    } else if (filters.order.sort === 'DESC' && data.length > 0) {
      setData2(data.sort((element, elementTwo) => {
        if (element.name < elementTwo.name) {
          return POSITVE_VALUE;
        }
        if (element.name > elementTwo.name) {
          return NEGATIVE_VALUE;
        }
        return NEUTRAL_VALUE;
      }));
    }
  }, [NEGATIVE_VALUE, data, filters.order.sort]);

  const filtro = (plan) => {
    switch (otherFilters[0].comparision) {
    case 'maior que':
      return (
        Number(plan[otherFilters[0].column]) > Number(otherFilters[0].value)
      );
    case 'menor que':
      return (
        Number(plan[otherFilters[0].column]) < Number(otherFilters[0].value)
      );
    case 'igual a':
      return (
        Number(plan[otherFilters[0].column]) === Number(otherFilters[0].value)
      );
    default:
      return true;
    }
  };

  return (
    <div>
      {data.length === 0 ? (
        'Carregou...'
      ) : (
        <table>
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
          <tbody>
            {data
              .filter((plane) => plane.name.includes(nameFilter))
              .filter((plan) => filtro(plan))
              .sort(
                filters.order.sort === 'DESC'
                  ? (a, b) => b[filters.order.column] - a[filters.order.column]
                  : (a, b) => a[filters.order.column] - b[filters.order.column],
              )
              .map((planet) => (
                <tr>
                  <td data-testid="planet-name">{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>
                    {planet.films.map((film) => (
                      <p>{film}</p>
                    ))}
                  </td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
