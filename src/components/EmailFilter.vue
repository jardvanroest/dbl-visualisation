<template>
  <div class="email-filter-container">
    <input v-model="searchText" placeholder="Search emailaddress" />

    <p v-if="filteredPersons.length === 0" class="no-email-addresses-found">
      No emailaddress matched your search
    </p>

    <div
      v-for="(person, i) in filteredPersons"
      :key="person.id"
      class="selectable-email"
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
      v-if="numShownEmailAddresses < filteredPersons.length"
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
      console.log(currentlySelectedPersons);
      this.setFilteredInPersons(currentlySelectedPersons);
    },
  },
  computed: {
    ...mapGetters(["persons"]),
    filteredPersons() {
      const persons = [...this.persons]
        .sort((personA, personB) =>
          personA.emailAddress < personB.emailAddress ? -1 : 1
        )
        .sort(
          (personA, personB) =>
            personB.isSelectedInEmailFilter - personA.isSelectedInEmailFilter
        );

      if (this.searchTextLowerCase === "") {
        return persons;
      } else {
        return persons.filter((person) =>
          person.emailAddress.includes(this.searchTextLowerCase)
        );
      }
    },
    searchTextLowerCase() {
      return this.searchText.toLowerCase();
    },
    selectedPersons() {
      return this.persons.filter((x) => x.isSelectedInEmailFilter);
    },
  },
  methods: {
    increaseShownEmailAddresses() {
      this.numShownEmailAddresses += 5;
    },
    ...mapActions(["setFilteredInPersons"]),
  },
};
</script>

<style>
label {
  margin-left: 5px;
}

.selectable-email {
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

.no-email-addresses-found {
  color: var(--error-color);
}
</style>
