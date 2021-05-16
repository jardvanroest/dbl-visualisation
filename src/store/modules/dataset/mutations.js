export default {
  addEmail(state, email) {
    state.emails.push(email);
  },
  addPerson(state, person) {
    if (state.persons[person.id] === undefined) {
      state.persons[person.id] = person;
    }
  },
  setFilteredInPersons(state, persons) {
    state.filteredInPersons = persons;
  },
  addSendEmailToPerson(state, payload) {
    state.persons[payload.id].sendEmails.push(payload.email);
  },
  addReceivedEmailToPerson(state, payload) {
    state.persons[payload.id].receivedEmails.push(payload.email);
  },
};
