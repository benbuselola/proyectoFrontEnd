const axios = require('axios');

const fetchPokemonData = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151');
    const pokemons = response.data.results;

    const pokemonData = await Promise.all(
      pokemons.map(async (pokemon) => {
        const pokemonDetails = await axios.get(pokemon.url);
        return {
          name: pokemonDetails.data.name,
          image: pokemonDetails.data.sprites.front_default,
          type: pokemonDetails.data.types.map((type) => type.type.name).join(", "),
          height: pokemonDetails.data.height,
          weight: pokemonDetails.data.weight,
          pokedexNumber: pokemonDetails.data.id,
        };
      })
    );

    return pokemonData; // Devuelve la colección de datos de Pokemon
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null; // O maneja el error de alguna otra manera
  }
};

module.exports = fetchPokemonData;
