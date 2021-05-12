export default {
  addEmail(state, email) {
    state.emails.push(email);
  },
  addPerson(state, person) {
    state.persons[person.id] = person;
  },
};
