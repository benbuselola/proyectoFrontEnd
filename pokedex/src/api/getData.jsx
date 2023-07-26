
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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

        setData(pokemonData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        data.map((pokemon, index) => (
          <div key={index}>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>Type: {pokemon.type}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Pokedex Number: {pokemon.pokedexNumber}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonComponent;
