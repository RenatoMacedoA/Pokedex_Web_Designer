// Objeto que vai armazenar as funções da API
const pokeApi = {}


// Função que transforma os dados da API em um objeto Pokemon organizado
function convertPokeApiDetailToPokemon(pokeDetail) {

    // Cria um novo objeto Pokemon
    const pokemon = new Pokemon()

    // Número do Pokémon (ID)
    pokemon.number = pokeDetail.id

    // Nome do Pokémon
    pokemon.name = pokeDetail.name


    // Pega todos os tipos do Pokémon (ex: grass, poison)
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

    // Pega apenas o primeiro tipo (tipo principal)
    const [type] = types

    // Salva todos os tipos
    pokemon.types = types

    // Salva o tipo principal
    pokemon.type = type


    // Pega a imagem do Pokémon
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    // Retorna o objeto já organizado
    return pokemon
}


// Função que busca os detalhes de um Pokémon específico
pokeApi.getPokemonDetail = (pokemon) => {

    // Faz a requisição usando a URL do Pokémon
    return fetch(pokemon.url)

        // Converte a resposta para JSON
        .then((response) => response.json())

        // Converte os dados para o formato do seu projeto
        .then(convertPokeApiDetailToPokemon)
}


// Função que busca vários Pokémons com paginação
pokeApi.getPokemons = (offset = 0, limit = 5) => {

    // Monta a URL com paginação (offset = início, limit = quantidade)
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)

        // Converte a resposta para JSON
        .then((response) => response.json())

        // Pega apenas a lista de resultados
        .then((jsonBody) => jsonBody.results)

        // Para cada Pokémon, busca os detalhes completos
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))

        // Aguarda todas as requisições terminarem
        .then((detailRequests) => Promise.all(detailRequests))

        // Retorna a lista completa com detalhes
        .then((pokemonsDetails) => pokemonsDetails)
}
