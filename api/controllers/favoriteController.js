import Favorite from '../models/favorite.js';

/**
 * Adds a Pokémon to the user's favorites.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.pokemonId - The ID of the Pokémon to be added to favorites.
 * @param {Object} req.headers - The request headers.
 * @param {string} req.headers.userUuid - The UUID of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the Pokémon is successfully added to favorites.
 * @throws {Error} - If there is an error while adding the Pokémon to favorites.
 */
export async function addFavorite(req, res) {
    try {
        const { pokemonId } = req.body;
        const userUuid = req.headers['user-uuid'];

        const existingFavorite = await Favorite.findOne({ userUuid, pokemonId });
        if (existingFavorite) {
            return res.status(400).send('Este Pokémon ya está marcado como favorito.');
        }

        const favorite = new Favorite({ userUuid, pokemonId });
        await favorite.save();

        res.status(200).json({ message: 'Pokémon añadido a favoritos' });
    } catch (error) {
        res.status(500).send('Error al añadir a favoritos: ' + error.message);
    }
}
