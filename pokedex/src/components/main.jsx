// main.js
const urlAPI = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const pokemonsContainer = document.querySelector('.pokemon-todos');

fetch(urlAPI)
    .then(response => response.json())
    .then(data => {
        const results = data.results;
        results.forEach((result, index) => {
            fetch(result.url)
                .then(response => response.json())
                .then(data => {
                    let types = [];
                    data.types.forEach(type => {
                        types.push(type.type.name);
                    });
                    pokemonsContainer.innerHTML += `
                        <article class="pokemon">
                            <p class="pokemon-id-back">${data.id}</p>
                            <div class="pokemon-imagen">
                                <img src="${data.sprites.front_default}" alt="${data.name}">
                            </div>
                            <div class="pokemon-info">
                                <div class="nombre-contenedor">
                                    <p class="pokemon-id">#${data.id}</p>
                                    <h2 class="pokemon-nombre">${data.name}</h2>
                                </div>
                                <div class="pokemon-tipos">
                                    ${types.map(type => `<span class="tipo ${type}">${type}</span>`).join('')}
                                </div>
                                <div class="pokemon-stats">
                                    ${data.stats.map(stat => `<span class="stat">${stat.base_stat}</span>`).join('')}
                                </div>
                            </div>
                        </article>
                    `;
                });
        });
    });
