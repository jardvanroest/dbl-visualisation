//import { range } from "d3-array";

import { range } from "d3-array";

export default {
  emails(state) {
    return state.emails;
  },
  filteredEmails(state, getters) {
    if (!getters.thereAreAddressesSelectedInTheEmailFilter) return state.emails;

    const persons = state.filteredPersons;

    const filteredEmails = persons.flatMap((person) =>
      person.sendEmails.concat(person.receivedEmails)
    );

    return makeUnique(filteredEmails);
  },
  getRangeYears(state) {
    // get the range of all years between the minimum and the maximum;
    let min = state.emails[0].date.getFullYear();
    let max = state.emails[0].date.getFullYear();

    for (let i = 1; i < state.emails.length; i++) {
      if (state.emails[i].date.getFullYear() > max)
        max = state.emails[i].date.getFullYear();
      if (state.emails[i].date.getFullYear() < min)
        min = state.emails[i].date.getFullYear();
    }
    return range(min, max + 1);
  },
  persons(state) {
    return Object.values(state.persons);
  },
  numberOfPersons(state, getters) {
    return getters.persons.length;
  },
  thereAreAddressesSelectedInTheEmailFilter(state) {
    return state.filteredPersons.length > 0;
  },
  getInspectorData(state) {
    return state.inspectorData;
  },
  getPersonById(state) {
    return (id) => {
      return state.persons[id];
    };
  },
};

function makeUnique(array) {
  return [...new Set(array)];
}
