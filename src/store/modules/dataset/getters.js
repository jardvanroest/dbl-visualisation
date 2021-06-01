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
  getEmailsByDates() {
    return (d3, set) => {
      return groupData(set, d3);
    };
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
function groupData(set, d3) {
  let group = d3.groups(set, (d) => d.date.getUTCFullYear()).sort();
  for (let i = 0; i < group.length; i++) {
    group[i][1] = parseDates(group[i][1]);
  }
  return group;
}
function parseDates(arrDates) {
  let returnObj = [];
  for (let i = 0; i < arrDates.length; i++) {
    let exist = returnObj.some(
      (e) => e.date.getTime() == arrDates[i].date.getTime()
    );
    if (exist) {
      try {
        returnObj
          .find((e) => e.date.getTime() == arrDates[i].date.getTime())
          .emails.push(arrDates[i]);
      } catch (e) {
        console.log(arrDates[i].date.getDay());
      }
    } else {
      returnObj.push({
        date: arrDates[i].date,
        emails: [arrDates[i]],
      });
    }
  }
  return returnObj;
}
function makeUnique(array) {
  return [...new Set(array)];
}
