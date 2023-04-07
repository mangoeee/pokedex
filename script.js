let searchBar = document.querySelector('input[type="text"]');

// Change sprite on input using pokemondb, not pokeAPI
//
const getPokemon = async (input) => {
    input = searchBar.value;

    // Display sprite from pokemondb
    //
    let spriteURL = `https://img.pokemondb.net/sprites/scarlet-violet/normal/${input.toLowerCase()}.png`;
    document.getElementById("sprite").src = spriteURL;
    // Display info box
    //
    let bigbox = document.querySelector('.bigbox');
    bigbox.style.setProperty('display', 'flex')
    // Fetch data from PokeAPI
    //
    const pokeAPI = `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`;
    const response = await fetch(pokeAPI);
    // Catch and display error
    //
    if (response.status == 404 || response.statusText == 'Not Found'){
        document.getElementById('error').classList.add('show')
        document.getElementById('error').classList.remove('hidden')
        return;
    } 
    let pokemon = await response.json()
    // Update page with pokemon data
    //
    // If a pokemon only has one type, pokemon.types[1].type.name returns as undefined and breaks the code, this if statement fixes that
    //
    const pokeType1 = pokemon.types[0];
    const pokeType2 = pokemon.types[1];
    if (typeof pokeType2 === 'undefined') {
        document.getElementById('update_type').innerHTML = `${pokeType1.type.name}`
    } 
    else {
        document.getElementById('update_type').innerHTML = `${pokeType1.type.name} / ${pokeType2.type.name}`
    }
    
    document.getElementById('update_name').innerHTML = pokemon.name.charAt(0).toUpperCase() + input.slice(1);
    document.getElementById('update_height').innerHTML = `${pokemon.height / 10}m / ~${(pokemon.height * 3.937.toFixed(0))}"`;
    document.getElementById('update_weight').innerHTML = `${pokemon.weight / 10}kg / ${(pokemon.weight / 4.536).toFixed(1)}lbs`;
    
    // Display pokemon species
    //
    const getPokemonInfo = async (input) => {
        input = searchBar.value;
        pokeSpeciesAPI = `https://pokeapi.co/api/v2/pokemon-species/${input.toLowerCase()}`;
        const response = await fetch(pokeSpeciesAPI);
        
        // Update page with pokemon data
        //
        let pokemon = await response.json()
    
        document.getElementById('update_species').innerHTML = pokemon.genera[7].genus

        document.getElementById('update_entry').innerHTML = pokemon.flavor_text_entries[0].flavor_text
    }

    getPokemonInfo()
};


// Use enter to submit search query
//
let btn = document.getElementById('btn');

document.addEventListener("keyup", function(event) {
        if (event.code === 'Enter') {
            btn.click();
        }
    });