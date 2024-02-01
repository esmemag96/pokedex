import { Schema, model } from 'mongoose';

/**
 * Represents a favorite Pokemon.
 * @typedef {Object} Favorite
 * @property {string} userUuid - The UUID of the user who favorited the Pokemon.
 * @property {number} pokemonId - The ID of the favorited Pokemon.
 */
const favoriteSchema = new Schema({
  userUuid: { type: String, required: true },
  pokemonId: { type: Number, required: true }
});

const Favorite = model('Favorite', favoriteSchema);

export default Favorite;
