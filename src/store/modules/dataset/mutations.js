export default {
  addEmail(state, email) {
    state.emails.push(email);
  },
  addPerson(state, newPerson) {
    if (
      !state.persons.some((person) => {
        return person.id === newPerson.id;
      })
    ) {
      state.persons.push(newPerson);
    }
  },
};
