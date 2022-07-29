import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react';

describe('Verifica se os elementos são renderizados', () => {
  beforeEach(() => {
    render(<App />);
  })

  test('Verifica se a tabela é renderizada', async () => {
    expect(await screen.findByTestId('table')).toBeInTheDocument();
  });

  test('Verifica se os filtros são renderizados', async () => {
    expect(await screen.findByTestId('filters')).toBeInTheDocument();
  });
});