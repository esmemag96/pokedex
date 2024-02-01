import axios from "axios";
import store from "../store/index.js";

/**
 * Service for interacting with the Pokemon API.
 * @module pokemonService
 */
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const userUuid = store.state.userUuid;
    if (userUuid) {
      config.headers["User-UUID"] = userUuid;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Retrieves a list of Pokemons from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of Pokemons.
 */
const getPokemons = async () => {
  try {
    const response = await api.get("/pokemons");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los Pokémon:", error);
    return [];
  }
};

/**
 * Retrieves a Pokemon by its ID.
 * @param {number} id - The ID of the Pokemon.
 * @returns {Promise<Object>} - A Promise that resolves to the Pokemon data.
 */
const getPokemonByID = async (id) => {
  try {
    const response = await api.get(`/pokemons/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
    return [];
  }
};

/**
 * Adds a Pokemon to favorites.
 * @param {number} pokemonId - The ID of the Pokemon to add to favorites.
 * @returns {Promise<Object>} - A Promise that resolves to the response data if successful, or an error object if unsuccessful.
 */
const addToFavorites = async (pokemonId) => {
  try {
    const response = await api.post("/favorites", { pokemonId });
    return response.data;
  } catch (error) {
    console.error("Error al añadir a favoritos:", error);
    return { error: "No se pudo añadir a favoritos" };
  }
};
export { getPokemons, getPokemonByID, addToFavorites };
