import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import PokemonCard from "@/components/PokemonCard.vue";
import NotFound from "@/components/NotFound.vue";

describe("HomeView.vue", () => {
  it("renders a title", () => {
    const wrapper = shallowMount(HomeView);
    expect(wrapper.find(".pokemon-title").text()).to.include(
      "Pokédex Esmeralda"
    );
  });

  it("has a search bar", () => {
    const wrapper = shallowMount(HomeView);
    const input = wrapper.find(".searchbar");
    expect(input.exists()).to.be.true;
  });

  it("displays PokemonCard components for each pokemon", async () => {
    const pokemons = [
      { id: 1, name: "Bulbasaur", isFavorite: false },
      { id: 2, name: "Ivysaur", isFavorite: false },
    ];

    const wrapper = shallowMount(HomeView, {
      data() {
        return { pokemons };
      },
    });

    await wrapper.vm.$nextTick();

    const pokemonCards = wrapper.findAllComponents(PokemonCard);
    expect(pokemonCards).to.have.lengthOf(pokemons.length);
  });
  it("displays NotFound component when there are no pokemons", async () => {
    const wrapper = shallowMount(HomeView, {
      data() {
        return { pokemons: [] };
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(NotFound).exists()).to.be.true;
  });
});
