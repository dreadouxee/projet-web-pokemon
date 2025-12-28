//DOM
const pokedex = document.getElementById("pokedex");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

let pokemons = [];
let filteredPokemons = [];

// Charger tous les Pokémon
async function loadPokemon() {
    try {
        const res = await fetch("https://tyradex.vercel.app/api/v1/pokemon");
        pokemons = await res.json();
        filteredPokemons = [...pokemons];
        displayPokemons(filteredPokemons); // Affiche tous les Pokémon
    } catch (err) {
        console.error("Erreur lors du fetch :", err);
    }
}

// Afficher les Pokémon
function displayPokemons(list) {
    pokedex.innerHTML = ""; 
    list.forEach(poke => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
             <div class="pokemon-card">
            <img src="${poke.sprites.regular}" alt="${poke.name.fr}">
            <h3>${poke.name.fr}</h3>
            <p>#${poke.pokedex_id}</p>
        </div>`;

        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const url = `infopagepokemon.html?id=${poke.pokedex_id}&name=${poke.name.fr}`.toLowerCase();
            window.open(url, "_blank");
        });

        pokedex.appendChild(card);
    });
}

// Filtrer et trier
function applyFilterAndSort() {
    const searchTerm = searchInput.value.toLowerCase();
    const sortBy = sortSelect.value;

    filteredPokemons = pokemons.filter(p => p.name.fr.toLowerCase().includes(searchTerm));

    if (sortBy === "name") {
        filteredPokemons.sort((a, b) => a.name.fr.localeCompare(b.name.fr));
    } else {
        filteredPokemons.sort((a, b) => a.pokedex_id - b.pokedex_id);
    }

    displayPokemons(filteredPokemons);
}

// Événements
searchInput.addEventListener("input", applyFilterAndSort);
sortSelect.addEventListener("change", applyFilterAndSort);

loadPokemon();
