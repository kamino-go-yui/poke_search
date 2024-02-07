/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("favorite_pokemons", table => {
    table.integer("favorite_id").primary();
    table.integer("pokemon_id").primary();
    table.string("name").notNullable();
    table.string("image").notNullable();
    table.string("url").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("favorite_pokemons")
};
