export default {
<<<<<<< HEAD
  newInspectorData(state, newData) {
    state.inspectorData = newData;
=======
  removeCurrentDataset(state) {
    state.emails = [];
    state.persons = {};
    state.filteredPersons = [];
  },
  addEmail(state, email) {
    state.emails.push(email);
    state.persons[email.fromId].sendEmails.push(email);
    state.persons[email.toId].receivedEmails.push(email);
  },
  addPerson(state, person) {
    if (state.persons[person.id] === undefined) {
      state.persons[person.id] = person;
    }
  },
  setFilteredPersons(state, persons) {
    state.filteredPersons = persons;
>>>>>>> main
  },
};
