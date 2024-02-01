import Pokemon  from '../models/pokemon.js';
import Favorite from '../models/favorite.js';

/**
 * Retrieves all pokemons from the database and includes information about whether each pokemon is a favorite for the user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export async function getAllPokemons(req, res) {
    try {
        const userUuid = req.headers['user-uuid'];
        const pokemons = await Pokemon.find().sort({ id: 1 });
        const favorites = await Favorite.find({ userUuid }).lean();

        const favoritePokemonIds = new Set(favorites.map(fav => fav.pokemonId));

        const pokemonsWithFavorites = pokemons.map(pokemon => ({
            ...pokemon.toObject(),
            isFavorite: favoritePokemonIds.has(pokemon.id)
        }));

        res.json(pokemonsWithFavorites);
    } catch (error) {
        res.status(500).send('Error al obtener los Pokémon: ' + error.message);
    }
}

/**
 * Retrieves a Pokemon by its ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.params - The parameters object containing the ID of the Pokemon.
 * @param {string} req.params.id - The ID of the Pokemon.
 * @param {Object} req.headers - The headers object containing the user UUID.
 * @param {string} req.headers['user-uuid'] - The user UUID.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the Pokemon data is retrieved and sent as a response.
 * @throws {Error} - If there is an error retrieving the Pokemon data.
 */
export async function getPokemonById(req, res) {
    try {
        const { id } = req.params;
        const userUuid = req.headers['user-uuid'];
        const pokemonData = await Pokemon.findOne({ id });

        if (!pokemonData) {
            return res.status(404).json({ error: 'Pokémon no encontrado' });
        }

        const favorite = await Favorite.findOne({ userUuid, pokemonId: id }).lean();
        const isFavorite = !!favorite;

        const response = {
            ...pokemonData.toObject(),
            isFavorite
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos del Pokémon', details: error.message });
    }
}

