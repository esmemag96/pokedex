
/**
 * Express router for handling favorite routes.
 * @module routes/favorite
 */

import { Router } from 'express';
const router = Router();

import { addFavorite } from '../controllers/favoriteController.js';


// Route for adding a pokemo to favorites
router.post('/favorites', addFavorite);

export default router;
