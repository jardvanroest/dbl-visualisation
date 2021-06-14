export default {
  removeCurrentDataset(state) {
    state.emails = [];
    state.persons = {};
    state.filteredPersons = [];
    state.inspectorData = -1;
    state.jobTitles = [];
    state.filteredJobTitles = [];
  },
  addEmail(state, email) {
    state.emails.push(email);
    state.persons[email.fromId].sendEmails.push(email);
    state.persons[email.toId].receivedEmails.push(email);
  },
  addJobtitle(state, jobTitle) {
    if (!state.jobTitles.includes(jobTitle)) {
      state.jobTitles.push(jobTitle);
    }
  },
  addPerson(state, person) {
    if (state.persons[person.id] === undefined) {
      state.persons[person.id] = person;
    }
  },
  setFilteredPersons(state, persons) {
    state.filteredPersons = persons;
  },
  newInspectorData(state, newData) {
    state.inspectorData = newData;
  },
  setFilteredJobTitles(state, jobTitles) {
    state.filteredJobTitles = jobTitles;
  },
  updateDatasetID(state, id) {
    state.datasetID = id;
  },
};
