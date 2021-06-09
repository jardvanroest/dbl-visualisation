<template>
  <div class="job-title-filter-container">
    <div class="list-entry" v-for="jobtitle in jobtitles" :key="jobtitle">
      <input
        type="checkbox"
        name="checkbox"
        :value="jobtitle"
        v-model="checkedJobtitles"
      />
      <label for="checkbox">{{ jobtitle }}</label>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      checkedJobtitles: [],
    };
  },
  computed: {
    // ...mapGetters[("dataset", ["jobtitles"])],
  },
  methods: {
    // ...mapActions[("dataset", ["setFilteredJobtitles"])],
    // updateStore() {
    //   this.setFilteredJobtitles(checkedJobtitles);
    // },
  },
};
</script>

<style></style>
