import { useState } from 'react';

export default function useFilters() {
  const [filters, setFilters] = useState({
    filterByName: '',
    filterByNumericValues: [],
    order: {
      order: 'population',
      sort: 'ASC',
    },
  });

  return [filters, setFilters];
}
