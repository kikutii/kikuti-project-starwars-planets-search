import { useEffect, useState } from 'react';
import fetchPlanets from '../services/fetchPlanets';

export default function useData() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data.length) {
      return setFilteredData(data);
    }
    const fetchData = async () => {
      setData(await fetchPlanets());
    };
    fetchData();
  }, [data]);

  return [data, filteredData, setFilteredData];
}
