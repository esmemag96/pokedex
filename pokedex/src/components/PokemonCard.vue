<template>
  <div class="pokemon-card">
    <img :src="pokemon.sprite" :alt="pokemon.name" />
    <h2 class="pokemon-title">{{ pokemon.name }}</h2>
    <p v-if="pokemon.isFavorite"><span>&#127775;</span> Favorite pokemon</p>
    <p>ID: {{ pokemon.id }}</p>
    <button
      id="favorite-button"
      v-if="!pokemon.isFavorite"
      @click="$emit('favorite', pokemon.id)"
    >
      Add to favorites
    </button>
  </div>
</template>

<script>
/**
 * @name PokemonCard
 * @description A component that displays information about a Pokemon.
 * @props {Object} pokemon - The Pokemon object containing its details.
 */
export default {
  name: "PokemonCard",
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.pokemon-card {
  border: 5px solid #c80067;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin: 10px;
  width: 200px;
  background-color: #ffe6f3;
}

.pokemon-card img {
  max-width: 100px;
  margin-bottom: 5px;
}
.pokemon-card button {
  background-color: #c80067;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
}
.pokemon-title {
  margin: 0;
  text-transform: capitalize;
  color: #c80067;
}
</style>
