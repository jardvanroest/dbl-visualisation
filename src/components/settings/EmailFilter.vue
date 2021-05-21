<template>
  <div
    class="email-filter-container"
    :class="{ hideScroll: noEmailAddressesAreShown }"
  >
    <input
      class="searchBox"
      v-model="searchText"
      placeholder="Search email address..."
    />

    <p v-if="noEmailAddressesAreShown" class="error">
      No email address matched your search
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
      this.setFilteredPersons(currentlySelectedPersons);
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
        person.emailAddress.includes(this.searchText.toLowerCase())
      );

      return searchedPersons;
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
    ...mapActions("dataset", ["setFilteredPersons"]),
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
  margin-bottom: 0.3em;
  margin-left: 0.7em;
}

input[type="checkbox"] {
  width: 0.9em;
  height: 0.9em;
  cursor: pointer;
}

.email-filter-container {
  max-height: 200px;
  overflow-y: scroll;
}

a {
  color: var(--accent-color-2);
  text-decoration: underline;
  font-size: 9pt;
  cursor: pointer;
}

.error {
  color: var(--error-color);
}

.searchBox {
  font-size: 10pt;
  margin-bottom: 0.5em;
  border: var(--settings-border);
  border-radius: 4px;
  background-image: url("/src/assets/icons/loupe.svg");
  background-size: 1em;
  background-position: 0.2em 0.1em;
  background-repeat: no-repeat;
  padding-left: 1.5em;
}

.hideScroll {
  overflow-y: hidden;
}
</style>
