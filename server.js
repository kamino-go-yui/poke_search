const express = require('express');
const path = require('path');
const db = require('./db/db');

const getTargetPokemon = async function (id) {
    const item = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const jsonItem = await item.json();
    return jsonItem;
}


// const setupServer = () => {
    const app = express();
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

    app.get(`/`, async (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.get(`/favorite`, async (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'favorite.html'));
    });

    app.get(`/api/pokemons`, async (req, res) => {

        const favoriteList = await db.select('*').from('favorite_pokemons');
        res.json(favoriteList);
    });

    app.post(`/api/pokemons`, async (req, res) => {
        const pokeId = req.body.id;
        let pokemonList = [];
        const favoritePokeIdList = await db.select('pokemon_id').from('favorite_pokemons');
        favoritePokeIdList.map((data) => {
            pokemonList.push(data.pokemon_id);
        });
        if (!(pokemonList.some((element) => element === pokeId))) {
            console.log(pokeId);
            const pokemonData = await getTargetPokemon(pokeId);

            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`

            const pokemon = {
                pokemon_id: pokemonData.id,
                name: pokemonData.name,
                image: imageUrl,
                url: baseUrl + pokemonData.id
            }

            const newFavorite = await db('favorite_pokemons').insert(
                pokemon, ['pokemon_id', 'name', 'image', 'url']);

            await res.json(newFavorite[0]);
        }
    });

    app.patch('/api/pokemons/name', async (req, res) => {
        const pokeId = req.body.id;
        const nickname = req.body.name;
        await db('favorite_pokemons').where({ pokemon_id: pokeId }).update({ name: nickname });
    });

    app.delete('/api/pokemons/:id', async (req, res) => {
        const pokeId = req.params.id;
        await db('favorite_pokemons').where({ pokemon_id: pokeId }).del();
    });


    app.listen(3000, () => {
        console.log("Server running", 3000);
    });

//     return app;
// };

// module.exports = { setupServer };
