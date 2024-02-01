import { Schema, model } from 'mongoose';

const abilitySchema = new Schema({
  name: String
});

/**
 * Represents a Pokemon.
 * @typedef {Object} Pokemon
 * @property {string} name - The name of the Pokemon.
 * @property {number} id - The ID of the Pokemon.
 * @property {number} height - The height of the Pokemon.
 * @property {Array} abilities - The abilities of the Pokemon.
 * @property {string} sprite - The sprite image URL of the Pokemon.
 * @property {boolean} isFavorite - Indicates whether the Pokemon is a favorite or not.
 */
const pokemonSchema = new Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true },
  height: { type: Number, required: true },
  abilities: [abilitySchema],
  sprite: String,
  isFavorite: { type: Boolean, default: false }
});

const Pokemon = model('Pokemon', pokemonSchema);

export default Pokemon;
