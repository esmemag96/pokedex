<template>
  <div class="not-found">
    <p>No Pokémon found. Try another search!</p>
    <img src="../assets/ditto.png" alt="not-found" />
  </div>
</template>

<script>
/**
 * @name NotFound
 * @description Component for displaying a message when no Pokémon is found.
 */
export default {
  name: "NotFound",
};
</script>

<style>
.not-found p {
  text-align: center;
  color: #ff0000;
}
</style>
