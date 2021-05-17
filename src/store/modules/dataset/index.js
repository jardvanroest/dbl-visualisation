import getters from "./getters.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

export default {
<<<<<<< HEAD
  state() {
    return {
      inspectorData: -1,
=======
  namespaced: true,
  state() {
    return {
      persons: {},
      emails: [],
      filteredPersons: [],
>>>>>>> main
    };
  },
  getters,
  actions,
  mutations,
};
