import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import PokemonCard from "@/components/PokemonCard.vue";

describe("PokemonCard.vue", () => {
  const pokemon = {
    id: 1,
    name: "Bulbasaur",
    sprite: "http://example.com/sprite.png",
    isFavorite: false,
  };

  it("renders pokemon name", () => {
    const wrapper = shallowMount(PokemonCard, {
      propsData: { pokemon },
    });
    expect(wrapper.find(".pokemon-title").text()).to.include(pokemon.name);
  });

  it("renders pokemon image", () => {
    const wrapper = shallowMount(PokemonCard, {
      propsData: { pokemon },
    });
    const image = wrapper.find("img");
    expect(image.exists()).to.be.true;
    expect(image.attributes("src")).to.equal(pokemon.sprite);
    expect(image.attributes("alt")).to.equal(pokemon.name);
  });

  it("displays favorite indicator if pokemon is favorite", () => {
    const favoritePokemon = { ...pokemon, isFavorite: true };
    const wrapper = shallowMount(PokemonCard, {
      propsData: { pokemon: favoritePokemon },
    });
    const favoriteIndicator = wrapper.find("p");
    expect(favoriteIndicator.text()).to.include("Favorite pokemon");
  });
});
