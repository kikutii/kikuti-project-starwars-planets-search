import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import mockPlanets from './mockPlanets';
import App from '../App';
import { act } from 'react-dom/test-utils';

describe('Testa o componente de Filtros', () => {
  beforeEach(() => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockPlanets),
      });
      render(<App />);
  })

  test('Verifica se os filtros são renderizados', async () => {
    expect(await screen.findByTestId('filters')).toBeInTheDocument();
  });

  test('Verifica o filtro search nome', async () => {
    expect(await screen.findAllByTestId('planet')).toHaveLength(10);

    const searchInput = await screen.findByTestId('name-filter');
    userEvent.type(searchInput,'Alderaan');
    expect(await screen.findByRole('cell', {
      name: /Alderaan/i
    })).toBeInTheDocument();

    expect(await screen.findAllByTestId('planet')).toHaveLength(1)
  })

  test('Verifica o filtro column', async () => {
    const columnInput = await screen.findByTestId('column-filter');
    expect(columnInput).toBeInTheDocument();
    expect(columnInput).toHaveProperty('value', 'population')

    userEvent.selectOptions(columnInput, 'orbital_period');
    expect(columnInput).toHaveProperty('value', 'orbital_period')
  })

  test('Verifica o botão Filter', async () => {
    const columnInput = await screen.findByTestId('column-filter');
    const comparisonInput = await screen.findByTestId('comparison-filter');
    const valueInput = await screen.findByTestId('value-filter');
    const filterButton = await screen.findByTestId('button-filter')

    userEvent.selectOptions(columnInput, 'orbital_period');
    userEvent.selectOptions(comparisonInput, 'menor que');
    userEvent.type(valueInput, '20');

    expect(columnInput).toHaveProperty('value', 'orbital_period');
    expect(comparisonInput).toHaveProperty('value', 'menor que');
    expect(valueInput).toHaveProperty('value', '020');

    userEvent.click(filterButton);

    expect(columnInput).toHaveProperty('value', 'population');
    expect(comparisonInput).toHaveProperty('value', 'menor que');
    expect(valueInput).toHaveProperty('value', '020');
  })

  test('Verifica o filtro comparison de maior que', async () => {
    const comparisonInput = await screen.findByTestId('comparison-filter');
    const columnInput = await screen.findByTestId('column-filter');
    const valueInput = await screen.findByTestId('value-filter');
    const filterButton = await screen.findByTestId('button-filter')
    expect(await screen.findAllByTestId('planet')).toHaveLength(10)

    userEvent.selectOptions(columnInput, 'orbital_period');
    userEvent.selectOptions(comparisonInput, 'maior que');
    userEvent.type(valueInput, '400');
    userEvent.click(filterButton);
    
    expect(await screen.findAllByTestId('planet')).toHaveLength(5);
  })

  test('Verifica o filtro comparison de igual', async () => {
    const comparisonInput = await screen.findByTestId('comparison-filter');
    const columnInput = await screen.findByTestId('column-filter');
    const valueInput = await screen.findByTestId('value-filter');
    const filterButton = await screen.findByTestId('button-filter');
    expect(await screen.findAllByTestId('planet')).toHaveLength(10);

    userEvent.selectOptions(columnInput, 'orbital_period');
    userEvent.selectOptions(comparisonInput, 'igual a');
    userEvent.type(valueInput, '402');
    userEvent.click(filterButton);
    
    expect(await screen.findAllByTestId('planet')).toHaveLength(1);
  })

  test('Verifica a exclusão de um filtro', async () => {
    const comparisonInput = await screen.findByTestId('comparison-filter');
    const columnInput = await screen.findByTestId('column-filter');
    const valueInput = await screen.findByTestId('value-filter');
    const filterButton = await screen.findByTestId('button-filter')
    expect(await screen.findAllByTestId('planet')).toHaveLength(10)

    userEvent.selectOptions(columnInput, 'orbital_period');
    userEvent.selectOptions(comparisonInput, 'maior que');
    userEvent.type(valueInput, '400');
    userEvent.click(filterButton);

    expect(await screen.findAllByTestId('planet')).toHaveLength(5);
    const existentFilters = await screen.findAllByTestId('filter');
    expect(existentFilters).toHaveLength(1);

    const filterBtn = await screen.findByTestId('removeFilterBtn');

    expect(filterBtn).toBeInTheDocument();

    userEvent.click(filterBtn)

    expect(filterBtn).not.toBeInTheDocument();

    expect(await screen.findAllByTestId('planet')).toHaveLength(10)
  })

  test('Verifica se column vazia não tem elemento', async () => {
    const columnInput = await screen.findByTestId('column-filter')
    expect(columnInput).toBeInTheDocument();
    expect(columnInput).toHaveProperty('value', 'population')
    const filterButton = await screen.findByTestId('button-filter');


    userEvent.click(filterButton);

    expect(columnInput).toBeInTheDocument();
    expect(columnInput).toHaveProperty('value', 'orbital_period')

    userEvent.click(filterButton);
    userEvent.click(filterButton);
    userEvent.click(filterButton);
    userEvent.click(filterButton);

    expect(columnInput).toHaveLength(0);
  })

  test('Verifica se o Botão de deletar remove todos os filtros', async () => {
    const comparisonInput = await screen.findByTestId('comparison-filter');
    const columnInput = await screen.findByTestId('column-filter');
    const valueInput = await screen.findByTestId('value-filter');
    const filterButton = await screen.findByTestId('button-filter');
    expect(await screen.findAllByTestId('planet')).toHaveLength(10)

    userEvent.selectOptions(columnInput, 'orbital_period');
    userEvent.selectOptions(comparisonInput, 'maior que');
    userEvent.type(valueInput, '400');
    userEvent.click(filterButton);
    expect(await screen.findAllByTestId('planet')).toHaveLength(5);

    userEvent.selectOptions(columnInput, 'rotation_period');
    userEvent.selectOptions(comparisonInput, 'maior que');
    userEvent.type(valueInput, '20');
    userEvent.click(filterButton);

    const deleteAllFilters = await screen.findByTestId('button-remove-filters');
    userEvent.click(deleteAllFilters);

    expect(await screen.findAllByTestId('planet')).toHaveLength(10);
  })

  test('Verifica a ordenação', async () => {
    const orderInput = await screen.findByTestId('column-sort');
    const ascInput = await screen.findByTestId('column-sort-input-asc');
    const descInput = await screen.findByTestId('column-sort-input-desc');
    const sortButton = await screen.findByTestId('column-sort-button');
    expect(orderInput).toHaveProperty('value', 'population')
    userEvent.selectOptions(orderInput, 'orbital_period');
    expect(orderInput).toHaveProperty('value', 'orbital_period')
    userEvent.selectOptions(orderInput, 'population');
    expect(orderInput).toHaveProperty('value', 'population')
    userEvent.click(ascInput);
    userEvent.click(sortButton);
    userEvent.click(descInput);
    userEvent.click(sortButton);
  })

  test('Verifica a tabela inicial', async () => {
    const planetNames = await screen.findAllByTestId('planet-name');
    expect(planetNames[0].innerHTML).toBe(mockPlanets.results[0].name)
    
    expect(planetNames[planetNames.length - 1].innerHTML).toBe(mockPlanets.results[mockPlanets.results.length - 1].name);
  })
});