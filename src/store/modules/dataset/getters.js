export default {
  emails(state, getters) {
    if (getters.thereAreSelectedEmailAddresses) {
      const filteredEmails = getFilteredEmails(state);
      return filteredEmails;
    } else {
      return state.emails;
    }
  },
  persons(state) {
    return Object.values(state.persons);
  },
  numberOfPersons(state, getters) {
    return getters.persons.length;
  },
  thereAreSelectedEmailAddresses(state, getters) {
    return getters.persons.some((person) => person.isSelected);
  },
};

function getFilteredEmails(state) {
  const filteredEmails = [];

  state.emails.forEach((email) => {
    if (
      isSelectedPerson(state, email.fromId) ||
      isSelectedPerson(state, email.toId)
    ) {
      filteredEmails.push(email);
    }
  });

  return filteredEmails;
}

function isSelectedPerson(state, id) {
  return state.persons[id].isSelected;
}
