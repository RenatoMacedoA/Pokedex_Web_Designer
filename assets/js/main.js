const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

// Função para converter lista de pokemons em HTML
function convertPokemonToLi(pokemon) {
    return `
        <!-- 👇 adicionamos o onclick aqui -->
        <li class="pokemon ${pokemon.type}" onclick="openPokemon('${pokemon.name.toLowerCase()}')"
">

            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail background-image-container">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

        </li>
    `
}



// Função para determinar o LIMITE de pokemons
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)



// main.js

loadMoreButton.addEventListener('click', () => {
    const isSearchResult = pokemonList.children.length === 1 || 
                           pokemonList.innerHTML.includes("não encontrado");

    if (isSearchResult) {
        // Se resetarmos para 0 aqui, a linha 'offset += limit' abaixo o tornará 10.
        // Por isso, definimos como o valor negativo do limite para que a soma resulte em 0!
        offset = -limit; 
        
        pokemonList.innerHTML = '';
        loadMoreButton.style.display = 'block';
    }

    // Agora, 0 + 10 = 10 (caso normal) OU -10 + 10 = 0 (caso de reset)
    offset += limit;
    
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});