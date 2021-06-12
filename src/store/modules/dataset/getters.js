export default {
  emails(state) {
    return state.emails;
  },
  filteredEmails(state, getters) {
    const filteredEmailAddresses = getters.filteredEmailAddresses;
    const filteredJobTitles = getters.filteredJobTitles;

    return getters.emails.filter((email) => {
      const passesEmailFilter =
        filteredEmailAddresses.includes(email.fromEmail) ||
        filteredEmailAddresses.includes(email.toEmail) ||
        filteredEmailAddresses.length === 0;

      const passesJobTitleFilter =
        filteredJobTitles.includes(email.fromJobTitle) ||
        filteredJobTitles.includes(email.toJobTitle) ||
        filteredJobTitles.length === 0;

      return passesEmailFilter && passesJobTitleFilter;
    });
  },
  filteredEmailAddresses(state) {
    return state.filteredPersons.map((person) => person.emailAddress);
  },
  filteredJobTitles(state) {
    return state.filteredJobTitles;
  },
  persons(state) {
    return Object.values(state.persons);
  },
  numberOfPersons(state, getters) {
    return getters.persons.length;
  },
  thereAreAddressesSelectedInTheEmailFilter(state) {
    return state.filteredPersons.length > 0;
  },
  getInspectorData(state) {
    return state.inspectorData;
  },
  getSortedMatrixData(state) {
    return state.sortedMatrixData;
  },
  getMatrixDataForSorting(state) {
    return state.matrixData;
  },
  jobTitles(state) {
    return state.jobTitles;
  },
  getDatasetID(state) {
    return state.datasetID;
  },
  // this function is a workaround needed for Popup.vue
  getDatasetLink(state) {
    return (
      "http://" +
      process.env.VUE_APP_SERVER_IP +
      ":8080/download?id=" +
      state.datasetID
    );
  },
};
