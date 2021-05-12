export default {
  emails(state) {
    const filteredEmails = [];

    // Only return emails where the to or from id is from a selected person (if there are people selected)
    if (thereAreSelectedEmailAddresses(state)) {
      state.emails.forEach((email) => {
        if (isSelected(state, email.fromId) || isSelected(state, email.toId)) {
          filteredEmails.push(email);
        }
      });

      return filteredEmails;
    } else {
      return state.emails;
    }
  },
  persons(state) {
    return state.persons;
  },
  numberOfPersons(state, getters) {
    return getters.persons.length;
  },
};

function thereAreSelectedEmailAddresses(state) {
  return state.persons.some((person) => person.isSelected);
}

function isSelected(state, id) {
  return state.persons.some((person) => person.id === id && person.isSelected);
}
