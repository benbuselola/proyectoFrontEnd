const totalGenerations = 8; // Número total de generaciones

let currentGeneration = 1;

async function obtenerPokemonPorGeneracion(generacion) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${generacion}/`);
    const datos = await response.json();
    const generationPokemons = datos.pokemon_species;

    return generationPokemons;
  } catch (error) {
    console.log("Ha ocurrido un error: ", error);
  }
}

async function obtenerPokemon(numero) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}/`);
    const datosPokemon = await response.json();

    const speciesName = datosPokemon.name;
    const spriteUrl = datosPokemon.sprites?.front_default;

    return { numero, speciesName, spriteUrl };
  } catch (error) {
    console.log("Ha ocurrido un error: ", error);
  }
}

function showCurrentGeneration() {
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  prevButton.disabled = currentGeneration === 1;
  nextButton.disabled = currentGeneration === totalGenerations;
}

async function mostrarDatos() {
  try {
    const main = document.querySelector("#main");
    main.innerHTML = ""; // Limpiar el contenido anterior antes de agregar nuevos resultados

    const generationPokemons = await obtenerPokemonPorGeneracion(currentGeneration);

    if (generationPokemons) {
      const hr = document.createElement("hr");
      main.appendChild(hr);

      const pokemons = [];

      for (const pokemon of generationPokemons) {
        const numero = parseInt(pokemon.url.split("/")[6]);
        const pokemonData = await obtenerPokemon(numero);

        if (pokemonData.spriteUrl) {
          pokemons.push(pokemonData);
        }
      }

      pokemons.sort((a, b) => a.numero - b.numero);

      for (const pokemon of pokemons) {
        const article = document.createElement("article");
        article.innerHTML = `
          <h2>${pokemon.speciesName}</h2>
          <div class="Pokemones">
            <img src="${pokemon.spriteUrl}" alt="${pokemon.speciesName}">
          </div>
        `;
        main.appendChild(article);
      }
    }

    showCurrentGeneration();
  } catch (error) {
    console.log("Ha ocurrido un error: ", error);
  }
}

document.getElementById("prevButton").addEventListener("click", () => {
  if (currentGeneration > 1) {
    currentGeneration--;
    mostrarDatos();
  }
});

document.getElementById("nextButton").addEventListener("click", () => {
  if (currentGeneration < totalGenerations) {
    currentGeneration++;
    mostrarDatos();
  }
});

mostrarDatos();
