const apiUrl = "https://pokeapi.co/api/v2/pokemon";
let offset = 0; // Pagination offset
const limit = 20; // Number of Pokémon per request

// Fetch and display Pokémon
async function fetchPokemon() {
    const response = await fetch(`${apiUrl}?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    displayPokemon(data.results);
}

function displayPokemon(pokemonList) {
    const container = document.getElementById("pokemon-container");
    pokemonList.forEach(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();

        // Create Pokémon card
        const card = document.createElement("div");
        card.className = "pokemon-card";

        // Add Pokémon image
        const img = document.createElement("img");
        img.src = data.sprites.front_default; // Get Pokémon sprite
        img.alt = pokemon.name;

        // Add Pokémon name
        const name = document.createElement("h3");
        name.textContent = pokemon.name;

        // Append to card
        card.appendChild(img);
        card.appendChild(name);

        // Add click event to show details
        card.addEventListener("click", () => showPokemonDetails(data));

        // Append card to container
        container.appendChild(card);
    });
}

// Show Pokémon details
function showPokemonDetails(pokemon) {
    const details = document.getElementById("pokemon-details");
    details.innerHTML = `
        <h2>${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Type:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
        <p><strong>Abilities:</strong> ${pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
        <button id="catch-button">Catch</button>
    `;
    details.classList.remove("hidden");
    details.style.display = "block";

    // Add click event to "Catch" button
    document.getElementById("catch-button").addEventListener("click", () => catchPokemon(pokemon.name));
}

// Catch Pokémon and save to local storage
function catchPokemon(pokemonName) {
    let caughtList = JSON.parse(localStorage.getItem("caughtPokemon")) || [];
    if (!caughtList.includes(pokemonName)) {
        caughtList.push(pokemonName);
        localStorage.setItem("caughtPokemon", JSON.stringify(caughtList));
        alert(`${pokemonName.toUpperCase()} was caught!`);
        displayCaughtPokemon();
    }
}

// Display caught Pokémon
function displayCaughtPokemon() {
    const caughtList = JSON.parse(localStorage.getItem("caughtPokemon")) || [];
    const caughtSection = document.getElementById("caught-pokemon-list");
    caughtSection.innerHTML = "";
    caughtList.forEach(pokemon => {
        const li = document.createElement("li");
        li.textContent = pokemon.toUpperCase();
        const releaseButton = document.createElement("button");
        releaseButton.textContent = "Release";
        releaseButton.className = "release-button";
        releaseButton.addEventListener("click", () => releasePokemon(pokemon));
        li.appendChild(releaseButton);
        caughtSection.appendChild(li);
    });
}

// Release Pokémon
function releasePokemon(pokemonName) {
    let caughtList = JSON.parse(localStorage.getItem("caughtPokemon")) || [];
    caughtList = caughtList.filter(pokemon => pokemon !== pokemonName);
    localStorage.setItem("caughtPokemon", JSON.stringify(caughtList));
    alert(`${pokemonName.toUpperCase()} was released!`);
    displayCaughtPokemon();
}

// Load more Pokémon
document.getElementById("load-more").addEventListener("click", () => {
    offset += limit;
    fetchPokemon();
});

// Initial load
fetchPokemon();
displayCaughtPokemon();

