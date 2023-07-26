import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './datos.css';

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
    <div className="pokemon-container">
      {data.length > 0 ? (
        data.map((pokemon, index) => (
          <div key={index} className={`pokemon-card type-${pokemon.type.split(", ")[0]}`}>
            <h2 className="pokemon-name">{pokemon.name}</h2>
            <img className="pokemon-image" src={pokemon.image} alt={pokemon.name} />
            <div className="pokemon-details">
              <div>
                <p className="pokemon-type">Type: {pokemon.type}</p>
                <p className="pokemon-height">Height: {pokemon.height}</p>
                <p className="pokemon-weight">Weight: {pokemon.weight}</p>
              </div>
              <div className="pokemon-number">
                <p>Pokedex Number:</p>
                <p>{pokemon.pokedexNumber}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonComponent;
