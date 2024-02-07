const { setupServer } = require("../server");
const db = require('../db/db');

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();





const server = setupServer();

describe('', () => {
    let request;
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';


    describe('1)POST /api/pokemons', async () => {
        it('should return pokemon list', async () => {
            const newFavorite = {
                pokemon_id: 25,
                name: 'pikachu',
                image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
                url: 'https://pokeapi.co/api/v2/pokemon/25'
            }
            const i = await chai.request(server).post('/api/pokemons').send(newFavorite);
            console.log(await i);
            await res.should.have.status(200);
        });
    });
});