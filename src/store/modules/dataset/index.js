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
      sortedMatrixData: "unsorted",
      matrixData: -1,
      jobTitles: [],
      filteredJobTitles: [],
      filteredDates: {},
      datasetID: "default",
      minDate: undefined,
      maxDate: undefined,
      maxEmailsDay_Filtered: undefined,
      meanSentiment_Filtered: undefined,
      variance_Filtered: undefined,
    };
  },
  getters,
  actions,
  mutations,
};
