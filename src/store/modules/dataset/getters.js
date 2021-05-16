export default {
  emails(state) {
    return state.emails;
  },
  filteredEmails(state, getters) {
    if (!getters.thereAreSelectedEmailAddresses) return state.emails;

    const persons = state.filteredInPersons;

    const filteredEmails = persons.flatMap((person) =>
      person.sendEmails.concat(person.receivedEmails)
    );

    return [...new Set(filteredEmails)];
  },
  persons(state) {
    return Object.values(state.persons);
  },
  numberOfPersons(state, getters) {
    return getters.persons.length;
  },
  thereAreSelectedEmailAddresses(state) {
    return state.filteredInPersons.length > 0;
  },
};
