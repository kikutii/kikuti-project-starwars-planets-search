import { useEffect, useState } from 'react';
import fetchPlanets from '../services/fetchPlanets';

export default function useData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setData(await fetchPlanets());
    };
    fetchData();
  }, []);

  return data;
}
