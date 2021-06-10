<template>
  <div class="job-title-filter-container">
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      checkedJobTitles: [],
    };
  },
  watch: {
    checkedJobTitles() {
      this.updateStore();
    },
  },
  computed: {
    ...mapGetters("dataset", ["jobTitles", "filteredJobTitles"]),
  },
  methods: {
    ...mapActions("dataset", ["setFilteredJobTitles"]),
    updateStore() {
      this.setFilteredJobTitles(this.checkedJobTitles);
    },
  },
};
</script>

<style></style>
