import getters from "./getters.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

export default {
  namespaced: true,
  state() {
    return {
      persons: {},
      emails: [],
      filteredPersons: [],
      inspectorData: -1,
<<<<<<< HEAD
      sortedMatrixData: "unsorted",
      matrixData: -1,
=======
>>>>>>> main
    };
  },
  getters,
  actions,
  mutations,
};
