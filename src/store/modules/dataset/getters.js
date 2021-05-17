export default {
  emails(state) {
    return state.emails;
  },
  filteredEmails(state, getters) {
    if (!getters.thereAreSelectedEmailAddresses) return state.emails;

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
  thereAreSelectedEmailAddresses(state) {
    return state.filteredPersons.length > 0;
  },
};

function makeUnique(array) {
  return [...new Set(array)];
}
