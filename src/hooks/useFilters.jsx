import { useState } from 'react';

export default function useFilters() {
  const [filters, setFilters] = useState({
    filterByName: '',
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  });

  return [filters, setFilters];
}
