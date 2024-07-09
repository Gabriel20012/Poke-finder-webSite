//take elements from html
const btnInput = document.getElementById('search-button');
const pName = document.getElementById('pokemon-name');
const id = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const contImg = document.getElementById('cont-img');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const favPokemonContainer = document.getElementById('fav-pok');
const clear = document.getElementById('Clear');



//take data from api
const showPokemon = async () => {
    const input = document.getElementById('search-input').value.toLowerCase();
    if (input === '') {
        alert("Please enter a Pokémon name or ID");
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }
        const data = await response.json();


        // add the received data to the DOM 
        pName.innerHTML = data.name;
        id.innerHTML = `#${data.id}`;
        weight.innerHTML = data.weight;
        height.innerHTML = data.height;
        hp.innerHTML = data.stats[0].base_stat;
        attack.innerHTML = data.stats[1].base_stat;
        defense.innerHTML = data.stats[2].base_stat;
        specialAttack.innerHTML = data.stats[3].base_stat;
        specialDefense.innerHTML = data.stats[4].base_stat;
        speed.innerHTML = data.stats[5].base_stat;

        // Add the image
        const imgFront = document.createElement('img');
        imgFront.id = 'sprite';
        imgFront.src = data.sprites.front_default;
        contImg.innerHTML = '';
        contImg.appendChild(imgFront);






        //btn favorite pokemons
        const addFav = document.createElement('button');
        addFav.innerHTML = 'Add to favorite';
        addFav.id = 'addFavPokemon';
        contImg.appendChild(addFav);


        //add fav
        const addFavPokemon = () => {
            let pokemonName = pName.innerHTML;
            let pokemonList = JSON.parse(localStorage.getItem('pokemons')) || [];
            if (pokemonList.includes(pokemonName)) {
                alert('This pokemon is already selected in fav. list!');
                return;
            }
            pokemonList.push(pokemonName);
            localStorage.setItem('pokemons', JSON.stringify(pokemonList));
            const newElementForFav = document.createElement('p');
            newElementForFav.textContent = pokemonName;
            let newButtonRemove = document.createElement('button');
            newButtonRemove.classList.add('removefromlist');
            newButtonRemove.textContent = 'remove';
            newButtonRemove.addEventListener('click', () => {
                pokemonList = pokemonList.filter(poke => poke !== pokemonName);
                localStorage.setItem('pokemons', JSON.stringify(pokemonList));
                newElementForFav.remove();
            });
            newElementForFav.appendChild(newButtonRemove);
            favPokemonContainer.appendChild(newElementForFav);
        }
        addFav.addEventListener('click', addFavPokemon);

    } catch (error) {
        alert(error.message);
    }
}


//load favorive pokemons to dom 
const loadFavPokemon = () => {
    const pokemon = JSON.parse(localStorage.getItem('pokemons')) || [];
    pokemon.forEach(pok => {
        const newElementForFav = document.createElement('p');
        newElementForFav.textContent = pok;
        newElementForFav.id = 'fav';
        favPokemonContainer.appendChild(newElementForFav);
    });


}
loadFavPokemon()

btnInput.addEventListener('click', showPokemon);



//clear storage
function ClearFavPok() {
    localStorage.removeItem('pokemons');
    favPokemonContainer.innerHTML = ''

}
clear.addEventListener('click', ClearFavPok);