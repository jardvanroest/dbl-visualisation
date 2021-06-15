<template>
  <div class="job-title-filter-container">
    <div class="entries-container">
      <div class="list-entry" v-for="jobTitle in jobTitles" :key="jobTitle">
        <input
          type="checkbox"
          name="checkbox"
          :value="jobTitle"
          v-model="checkedJobTitles"
        />
        <label for="checkbox">{{ jobTitle }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      checkedJobTitles: [],
    };
  },
  computed: {
    ...mapGetters("dataset", ["jobTitles"]),
  },
  methods: {
    ...mapActions("dataset", ["setFilteredJobTitles"]),
    applyFilter() {
      this.setFilteredJobTitles(this.checkedJobTitles);
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  margin-left: 0.5em;
}

.list-entry {
  font-size: 0.8125rem;
  margin-bottom: 0.25em;
  margin-left: 0.75em;
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
  max-height: 6.8em;
  width: 100%;
  overflow-y: auto;
}
</style>
