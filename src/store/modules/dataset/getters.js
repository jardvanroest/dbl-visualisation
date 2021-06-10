export default {
  emails(state) {
    return state.emails;
  },
  filteredEmails(state, getters) {
    if (!getters.thereAreAddressesSelectedInTheEmailFilter) return state.emails;

    const persons = state.filteredPersons;

    const filteredEmails = persons.flatMap((person) =>
      person.sendEmails.concat(person.receivedEmails)
    );

    return makeUnique(filteredEmails);
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

function makeUnique(array) {
  return [...new Set(array)];
}
