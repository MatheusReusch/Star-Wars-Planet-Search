import React, { useEffect, useState } from 'react';
import './App.css';
import planetsContext from './planetsContext';
import Table from './Table';

function App() {
  const [data, setData] = useState([]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisionFilter, setComparisionFilter] = useState('maior que');
  const [number, setNumber] = useState('');
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [{
      column: '',
      comparision: '',
      value: '',
    }],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });
  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((respone) => respone.json())
      .then((data) => setData(data.results));
  }, []);
  return (
    <planetsContext.Provider value={ { data, filters } }>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (event) => setFilters({ ...filters, filterByName: { name: event.target.value } }) }
      />
      <select value={ columnFilter } onChange={ (event) => setColumnFilter(event.target.value) } data-testid="column-filter">
        { filters.filterByNumericValues[0].column !== 'population' && <option>population</option> }
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select value={ comparisionFilter } onChange={ (event) => setComparisionFilter(event.target.value) } data-testid="comparison-filter">
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input value={ number } onChange={ (event) => setNumber(event.target.value) } type="number" data-testid="value-filter" />
      <button
        data-testid="button-filter"
        onClick={ () => setFilters({
          ...filters,
          filterByNumericValues: [{
            column: columnFilter,
            comparision: comparisionFilter,
            value: number,
          }],
        }) }
      >
        Adicionar filtro
      </button>
      <div data-testid="filter">
        <button
          onClick={ () => setFilters({
            ...filters,
            filterByNumericValues: [{
              column: '',
              comparision: '',
              value: '',
            }],
          }) }
        >
          X
        </button>
      </div>
      <div data-testid="filter">
        <button
          onClick={ () => setFilters({
            ...filters,
            filterByNumericValues: [{
              column: '',
              comparision: '',
              value: '',
            }],
          }) }
        >
          X
        </button>
      </div>
      <select
        onChange={ (event) => setFilters({
          ...filters,
          order: {
            ...filters.order,
            column: event.target.value,
          },
        }) }
        data-testid="column-sort"
      >
        <option>name</option>
        <option>population</option>
        <option>orbital_period</option>
      </select>
      <input
        onClick={ () => setFilters({
          ...filters,
          order: {
            ...filters.order,
            sort: 'ASC',
          },
        }) }
        data-testid="column-sort-input-asc"
        name="sort"
        type="radio"
        value="ASC"
      />
      <input
        onClick={ () => setFilters({
          ...filters,
          order: {
            ...filters.order,
            sort: 'DESC',
          },
        }) }
        data-testid="column-sort-input-desc"
        name="sort"
        type="radio"
        value="DESC"
      />
      <button data-testid="column-sort-button">Sort Button</button>
      <Table />
    </planetsContext.Provider>
  );
}

export default App;
