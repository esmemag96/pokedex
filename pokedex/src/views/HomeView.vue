/** * @name HomeView * @description The home view component of the Pokédex
Esmeralda application. * @component */
<template>
  <div class="home">
    <img src="../assets/pokemon_logo.png" alt="logo" />
    <h1 class="pokemon-title">Pokédex Esmeralda</h1>
    <input
      class="searchbar"
      type="text"
      v-model="searchQuery"
      placeholder="Search Pokemon by name or ID"
    />
    <div class="container" v-if="filteredPokemons.length">
      <PokemonCard
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        @favorite="markAsFavorite"
      />
    </div>
    <NotFound v-else />
  </div>
</template>

<script>
import PokemonCard from "@/components/PokemonCard.vue";
import NotFound from "@/components/NotFound.vue";
import { getPokemons, addToFavorites } from "@/services/pokemonService";

export default {
  /**
   * Name of the component.
   * @name HomeView
   * @type {string}
   */
  name: "HomeView",
  /**
   * Components used in the HomeView component.
   * @component
   */
  components: {
    PokemonCard,
    NotFound,
  },
  /**
   * Data properties of the HomeView component.
   * @data
   * @returns {object}
   */
  data() {
    return {
      /**
       * List of pokemons.
       * @property {Array} pokemons
       */
      pokemons: [],
      /**
       * Search query for filtering pokemons.
       * @property {string} searchQuery
       */
      searchQuery: "",
    };
  },
  /**
   * Lifecycle hook that is called after the component has been mounted.
   * @async
   * @method mounted
   */
  async mounted() {
    this.pokemons = await getPokemons();
  },
  /**
   * Computed properties of the HomeView component.
   * @computed
   * @returns {Array} filteredPokemons
   */
  computed: {
    filteredPokemons() {
      if (!this.searchQuery) {
        return this.pokemons;
      }
      const searchLower = this.searchQuery.toLowerCase();
      return this.pokemons.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchLower) ||
          pokemon.id.toString() === this.searchQuery.trim()
      );
    },
  },
  /**
   * Methods of the HomeView component.
   * @methods
   */
  methods: {
    /**
     * Marks a pokemon as favorite.
     * @async
     * @method markAsFavorite
     * @param {number} pokemonId - The ID of the pokemon to mark as favorite.
     */
    async markAsFavorite(pokemonId) {
      const result = await addToFavorites(pokemonId);
      if (result) {
        const pokemonToUpdate = this.pokemons.find(
          (pokemon) => pokemon.id === pokemonId
        );
        if (pokemonToUpdate) {
          pokemonToUpdate.isFavorite = true;
        }
      }
    },
  },
};
</script>

<style>
.home img {
  display: block;
  margin: 0 auto;
  width: 200px;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.searchbar {
  width: 50%;
  padding: 12px 20px;
  margin: 25px 0;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid pink;
}
</style>
