import { useState } from 'react';

export default function useFilters() {
  const [filters, setFilters] = useState({
    filterByName: '',
    filterByNumericValues: [],
  });

  return [filters, setFilters];
}
