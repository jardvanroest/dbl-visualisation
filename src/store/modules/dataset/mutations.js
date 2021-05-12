export default {
  addEmail(state, email) {
    state.emails.push(email);
  },
  addPerson(state, newPerson) {
    if (
      !state.people.some((person) => {
        return person.id === newPerson.id;
      })
    ) {
      state.people.push(newPerson);
    }
  },
};
