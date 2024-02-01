import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import pokemonRoutes from './routes/pokemon.js'; // Importing routes for Pokemon-related endpoints
import favoriteRoutes from './routes/favorite.js'; // Importing routes for favorite Pokemon-related endpoints
import { populateDatabase } from './services/pokeApi.js'; // Importing a service to populate the database with Pokemon data
const app = express();
const port = 3000;
dotenv.config(); // Loading environment variables from .env file
app.use(cors()); // Enabling CORS for all requests to allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON bodies
// Connecting to MongoDB using mongoose
connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB')) // Logging on successful connection
  .catch(err => console.error('Failed to connect to MongoDB', err)); // Logging if connection fails

// Calling the function to populate the database with Pokemon data from PokeAPI
// This function range could be adjusted to populate the database with more Pokemon data
populateDatabase(1, 100);

// Default route to indicate the API is working
app.get('/', (req, res) => res.send('Esmeralda Pokedex API'));

// Using the imported routes for handling requests to /pokemon and /favorite paths
app.use(pokemonRoutes, favoriteRoutes);

// Starting the server on the specified port
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
