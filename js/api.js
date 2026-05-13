const BASE_URL = "https://rickandmortyapi.com/api/character";

async function fetchCharacters(page = 1, filters = {}) {
  const params = new URLSearchParams({ page });
  
  if (filters.name) params.append("name", filters.name);
  if (filters.status) params.append("status", filters.status);
  if (filters.species) params.append("species", filters.species);
  if (filters.gender) params.append("gender", filters.gender);

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return { info: { pages: 0, count: 0 }, results: [] };
      }
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error al conectar con la API: ${error.message}`);
  }
}

export { fetchCharacters };