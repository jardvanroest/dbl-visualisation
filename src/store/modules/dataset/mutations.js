export default {
  removeCurrentDataset(state) {
    state.emails = [];
    state.persons = {};
    state.filteredPersons = [];
    state.inspectorData = -1;
    state.jobTitles = [];
    state.filteredJobTitles = [];
    state.filteredDates = {};
    state.minDate = undefined;
    state.maxDate = undefined;
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
  setFilteredDates(state, payload) {
    const from = payload.from;
    const to = payload.to;

    state.filteredDates = { from: from, to: to };
  },
  setFilteredDatesToMinMax(state) {
    state.filteredDates = { from: state.minDate, to: state.maxDate };
  },
  newInspectorData(state, newData) {
    state.inspectorData = newData;
  },
  newSortedMatrixData(state, newData) {
    state.sortedMatrixData = newData;
  },
  newMatrixData(state, newData) {
    state.matrixData = newData;
  },
  setFilteredJobTitles(state, jobTitles) {
    state.filteredJobTitles = jobTitles;
  },
  updateDatasetID(state, id) {
    state.datasetID = id;
  },
  updateMinMaxDates(state, date) {
    if (
      state.maxDate === undefined ||
      date.getTime() > state.maxDate.getTime()
    ) {
      state.maxDate = date;
    }

    if (
      state.minDate === undefined ||
      date.getTime() < state.minDate.getTime()
    ) {
      state.minDate = date;
    }
  },
};
