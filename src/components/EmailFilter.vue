<template>
  <div class="email-filter-container">
    <input v-model="searchText" placeholder="Search emailaddress..." />

    <p v-if="noEmailAddressesAreShown" class="error">
      No emailaddress matched your search
    </p>

    <div
      v-for="(person, i) in searchedPersons"
      :key="person.id"
      class="list-entry"
    >
      <div v-if="i < numShownEmailAddresses">
        <input
          type="checkbox"
          name="checkbox-item"
          v-model="person.isSelectedInEmailFilter"
        />
        <label class="email-adress" for="checkbox-item">{{
          person.emailAddress
        }}</label>
      </div>
    </div>

    <a
      v-if="numShownEmailAddresses < searchedPersons.length"
      @click="increaseShownEmailAddresses"
      >Show more</a
    >
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return { numShownEmailAddresses: 10, searchText: "" };
  },
  watch: {
    selectedPersons(currentlySelectedPersons) {
      this.setFilteredInPersons(currentlySelectedPersons);
    },
  },
  computed: {
    noEmailAddressesAreShown() {
      return this.searchedPersons.length === 0;
    },
    ...mapGetters("dataset", ["persons"]),
    searchedPersons() {
      const persons = this.sortedPersons;
      const searchedPersons = persons.filter((person) =>
        person.emailAddress.includes(this.searchTextAsLowerCaseText)
      );

      return searchedPersons;
    },
    searchTextAsLowerCaseText() {
      return this.searchText.toLowerCase();
    },
    selectedPersons() {
      return this.persons.filter((x) => x.isSelectedInEmailFilter);
    },
    sortedPersons() {
      let persons = this.sortAlphabetically(this.persons);
      persons = this.moveSelectedPersonsToTop(persons);
      return persons;
    },
  },
  methods: {
    ...mapActions("dataset", ["setFilteredInPersons"]),
    increaseShownEmailAddresses() {
      this.numShownEmailAddresses += 10;
    },
    sortAlphabetically(persons) {
      return [...persons].sort((personA, personB) =>
        personA.emailAddress < personB.emailAddress ? -1 : 1
      );
    },
    moveSelectedPersonsToTop(persons) {
      return [...persons].sort(
        (personA, personB) =>
          personB.isSelectedInEmailFilter - personA.isSelectedInEmailFilter
      );
    },
  },
};
</script>

<style>
label {
  margin-left: 5px;
}

.list-entry {
  margin-bottom: 3px;
}

.email-filter-container {
  max-height: 200px;
  overflow-y: scroll;
}

a {
  color: var(--link-color);
  text-decoration: underline;
  cursor: pointer;
}

.error {
  color: var(--error-color);
}
</style>
