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

<style lang="scss"></style>
