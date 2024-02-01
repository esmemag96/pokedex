import { Router } from 'express';
/**
 * Router for handling Pokemon-related routes.
 * @type {import('express').Router}
 */
const router = Router();
import { getAllPokemons, getPokemonById } from '../controllers/pokemonController.js';

// Route for getting all Pokemons.
router.get('/pokemons', getAllPokemons);

// Route for getting a Pokemon by its ID.
router.get('/pokemons/:id', getPokemonById);

export default router;
