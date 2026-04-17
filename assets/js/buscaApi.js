const poke_container = document.getElementById("pokemonList");
// No buscaApi.js, altere as primeiras linhas:
const searchInput = document.querySelector(".search-box input"); // Pega o input dentro da div search-box
const searchButton = document.querySelector(".search-box button"); // Pega o botão dentro da div search-box

document.addEventListener("DOMContentLoaded", () => {
  const poke_container = document.getElementById("pokemonList");
  const searchInput = document.querySelector(".search-box input");
  const searchButton = document.querySelector(".search-box button");

  const searchPokemon = async () => {
    let input = searchInput.value.toLowerCase().trim();

    if (!input) {
      // Se o input estiver vazio, você pode recarregar a lista inicial
      location.reload();
      return;
    }

    poke_container.innerHTML = `<p style="text-align:center; color: white;">Carregando... 🔄</p>`;

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${input}`,
      );

      if (!response.ok) throw new Error("Pokémon não encontrado");

      const pokeData = await response.json();

      // Reutilizando sua lógica do poke-api.js e main.js
      const pokemon = convertPokeApiDetailToPokemon(pokeData);
      const newHtml = convertPokemonToLi(pokemon);

      poke_container.innerHTML = newHtml;
    } // buscaApi.js

// buscaApi.js - Dentro do seu catch
catch (error) {
    poke_container.innerHTML = `
        <p style="
            color: red; 
            text-align: center; 
            font-weight: bold; 
            max-width: 250px; 
            margin: 20px auto; 
            line-height: 1.5;
        ">
            Pokémon <span>${input}</span> não encontrado 😢 <br>
            Use o Load More para voltar.
        </p>
    `;
}
  };

  searchButton.addEventListener("click", searchPokemon);

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchPokemon();
  });
});
