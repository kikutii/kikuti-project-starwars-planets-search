import { useEffect, useState } from 'react';
import fetchPlanets from '../services/fetchPlanets';

export default function useData() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data.length) {
      const magicNumber = -1;
      return setFilteredData(data.sort((a, b) => (a.name > b.name ? 1 : magicNumber)));
    }
    const fetchData = async () => {
      setData(await fetchPlanets());
    };
    fetchData();
  }, [data]);

  return [data, filteredData, setFilteredData];
}
