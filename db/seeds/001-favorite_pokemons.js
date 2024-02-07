/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('favorite_pokemons').del()
  await knex('favorite_pokemons').insert([
    {
      pokemon_id: 25, 
      name: 'pikachu',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      url: 'https://pokeapi.co/api/v2/pokemon/25'
    }
  ]);
};
