
import axios from 'axios';
import Pokemon from '../models/pokemon.js';

/**
 * Retrieves the data of a Pokemon based on its ID.
 * @param {number} pokemonId - The ID of the Pokemon.
 * @returns {Promise<Object|null>} - The Pokemon data if found, or null if not found.
 * @throws {Error} - If there is an error retrieving the Pokemon data.
 */
export async function getPokemonData(pokemonId) {
    try {
        const pokemon = await Pokemon.findOne({ id: pokemonId });
        if (!pokemon) {
            return null;
        }
        return pokemon;
    } catch (error) {
        console.error(`Error getting pokemon with ID ${pokemonId}:`, error);
        throw error;
    }
};
/**
 * Fetches and saves a Pokemon with the given ID.
 * If the Pokemon already exists in the database, it will not be saved again.
 *
 * @param {number} pokemonId - The ID of the Pokemon to fetch and save.
 * @returns {Promise<void>} - A promise that resolves once the Pokemon is fetched and saved, or rejects if there was an error.
 */
async function fetchAndSavePokemon(pokemonId) {
    try {
        const existingPokemon = await Pokemon.findOne({ id: pokemonId });
        if (existingPokemon) {
          console.log(`Pokemon with ID ${pokemonId} already exists.`);
          return;
        }
  
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemon = new Pokemon({
          name: data.name,
          id: data.id,
          height: data.height,
          abilities: data.abilities.map(a => ({ name: a.ability.name, url: a.ability.url })),
          sprite: data.sprites.front_default
        });
  
        await pokemon.save();
        console.log(`Pokemon ${data.name} saved.`);
      } catch (error) {
        console.error(`Could not save pokemon whith ID: ${pokemonId}:`, error);
      }
  }
  
/**
 * Populates the database with Pokemon data from a specified range of IDs.
 * @param {number} startId - The starting ID of the range.
 * @param {number} endId - The ending ID of the range.
 * @returns {Promise<void>} - A promise that resolves when the database population is complete.
 */
export async function populateDatabase(startId, endId) {
    for (let id = startId; id <= endId; id++) {
      await fetchAndSavePokemon(id);
    }
}
  
export default { getPokemonData, populateDatabase};
