import { v4 as uuidv4 } from "uuid";
import { createStore } from "vuex";

/**
 * Creates a Vuex store with initial state, mutations, actions, and getters.
 * @returns {Object} The Vuex store object.
 */
export default createStore({
  state: {
    userUuid: null,
  },
  mutations: {
    /**
     * Sets the user UUID in the store's state.
     * @param {Object} state - The Vuex store's state object.
     * @param {string} uuid - The user UUID to be set.
     */
    setUserUuid(state, uuid) {
      state.userUuid = uuid;
    },
  },
  actions: {
    /**
     * Initializes the user UUID by retrieving it from local storage or generating a new one if it doesn't exist.
     * @param {Object} context - The Vuex store's action context object.
     * @param {Function} context.commit - The commit function to trigger mutations.
     */
    initializeUserUuid({ commit }) {
      let userUuid = localStorage.getItem("userUuid");
      if (!userUuid) {
        userUuid = uuidv4();
        localStorage.setItem("userUuid", userUuid);
      }
      commit("setUserUuid", userUuid);
    },
  },
  getters: {
    /**
     * Retrieves the user UUID from the store's state.
     * @param {Object} state - The Vuex store's state object.
     * @returns {string} The user UUID.
     */
    userUuid: (state) => state.userUuid,
  },
});
