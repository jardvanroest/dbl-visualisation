export default {
  emails(state, getters) {
    const filteredEmails = [];

    // Only return emails where the to or from id is from a selected person (if there are people selected)
    if (getters.thereAreSelectedEmailAddresses) {
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
    return Object.values(state.persons);
  },
  numberOfPersons(state, getters) {
    return getters.persons.length;
  },
  thereAreSelectedEmailAddresses(state, getters) {
    return getters.persons.some((person) => person.isSelected);
  },
};

function isSelected(state, id) {
  return state.persons[id].isSelected;
}
