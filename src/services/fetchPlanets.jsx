export default async function fetchPlanets() {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(endpoint);
  const { results } = await response.json();
  // esse forEach remove a key "residents" de cada objeto, isso foi pedido pela trybe
  results.forEach((planet) => {
    delete planet.residents;
  });
  return results;
}
