// Pegando elementos do DOM
const modal = document.getElementById("pokemonPopup");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".close");

function calcPercent(valor) {
  return (valor / 255) * 100;
}

function getColor(valor) {
  if (valor < 50) return "red";
  if (valor < 100) return "orange";
  return "green";
}
// Função que abre o modal e busca os dados do Pokémon
async function openPokemon(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();

  const primaryType = data.types[0].type.name;
  const stats = {};
  data.stats.forEach(s => { stats[s.stat.name] = s.base_stat; });

  // Mantemos a estrutura exata que o seu modal.css espera
  modalBody.innerHTML = `
    <div class="pokemonPopup ${primaryType}">
      <header class="pokemon-header">
        <span id="identificacao">#${data.id}</span>
        <img src="${data.sprites.other.dream_world.front_default}" alt="${data.name}">
      </header>

      <main class="pokemon-info">
        <h2 id="nome" style="text-transform: capitalize;">${data.name}</h2>
        
        <span class="badge ${primaryType}">${primaryType}</span>

        <section class="status-list">
          <div class="stat-line">
            <span class="stat-name">HP</span>
            <span class="stat-value">${stats.hp}</span>
            <div class="bar-container">
              <div class="bar-fill ${primaryType}" style="width: ${calcPercent(stats.hp)}%;"></div>
            </div>
          </div>

          <div class="stat-line">
            <span class="stat-name">Ataque</span>
            <span class="stat-value">${stats.attack}</span>
            <div class="bar-container">
              <div class="bar-fill ${primaryType}" style="width: ${calcPercent(stats.attack)}%;"></div>
            </div>
          </div>
          
          <div class="stat-line">
            <span class="stat-name">Defesa</span>
            <span class="stat-value">${stats.defense}</span>
            <div class="bar-container">
              <div class="bar-fill ${primaryType}" style="width: ${calcPercent(stats.defense)}%;"></div>
            </div>
          </div>
          
          <div class="stat-line">
            <span class="stat-name">Speed</span>
            <span class="stat-value">${stats.speed}</span>
            <div class="bar-container">
              <div class="bar-fill ${primaryType}" style="width: ${calcPercent(stats.speed)}%;"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `;

  modal.classList.remove("hidden");
}

// Função auxiliar para renderizar as linhas de status
function renderStat(label, value, typeClass) {
  return `
    <div class="stat-line">
      <span class="stat-name">${label}</span>
      <span class="stat-value">${value}</span>
      <div class="bar-container">
        <div class="bar-fill ${typeClass}" style="width: ${calcPercent(value)}%;"></div>
      </div>
    </div>
  `;
}

// Evento para fechar o modal ao clicar no "X"
closeBtn.onclick = () => {
  modal.classList.add("hidden");
};


// Fecha o modal ao clicar em qualquer lugar fora da caixa de conteúdo
window.onclick = (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
};

// Fecha o modal ao apertar a tecla "Esc"
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.classList.add("hidden");
  }
});