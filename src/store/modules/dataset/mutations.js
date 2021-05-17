export default {
  reset(state) {
    state.emails = [];
    state.persons = {};
    state.filteredInPersons = [];
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
  setFilteredInPersons(state, persons) {
    state.filteredInPersons = persons;
  },
};
