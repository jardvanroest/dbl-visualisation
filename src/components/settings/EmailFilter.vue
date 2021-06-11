<template>
  <div class="email-filter-container">
    <div class="searchBox-container">
      <input
        class="searchBox"
        v-model="searchText"
        placeholder="Search email address..."
      />
    </div>

    <div class="entries-container">
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EmailFilter",
  data() {
    return {
      numShownEmailAddresses: 10,
      searchText: "",
      currentlySelectedPersons: [],
    };
  },
  watch: {
    selectedPersons(currentlySelectedPersons) {
      this.currentlySelectedPersons = currentlySelectedPersons;
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
    applyFilter() {
      this.setFilteredPersons(this.currentlySelectedPersons);
    },
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

<style lang="scss">
label {
  margin-left: 0.5em;
}

.list-entry {
  font-size: 0.8125rem;
  margin-bottom: 0.3em;
  margin-left: 0.7em;
}

input[type="checkbox"] {
  width: 0.9em;
  height: 0.9em;
  cursor: pointer;
}

.email-filter-container {
  position: relative;
}

.entries-container {
  max-height: 13em;
  width: 100%;
  overflow-y: auto;
}

a {
  color: var(--accent-color);
  text-decoration: underline;
  font-size: 0.75rem;
  cursor: pointer;
  margin-left: 1em;

  &:hover {
    color: var(--accent-color-2);
  }
}

.error {
  color: var(--error-color);
  margin: 0.25em;
}

.searchBox-container {
  z-index: 1;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-right: 1.5em;

  font-size: 0.75rem;
  background: transparent;
}

.searchBox {
  border: var(--settings-border);
  border-radius: 4px;
  background-image: url("../../assets/icons/loupe.svg");
  background-blend-mode: luminosity;
  background-size: 1em;
  background-position: 0.25em 0.15em;
  background-repeat: no-repeat;
  padding-left: 1.5em;

  &:focus {
    background-image: url("../../assets/icons/loupe_focus.svg");
  }
}
</style>
