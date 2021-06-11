<template>
  <div class="date-filter-container">
    <div class="date">
      <p class="date__label">From date:</p>
      <input
        class="date__input"
        type="date"
        :min="minDateAsString"
        :max="toDate"
        v-model="fromDate"
      />
    </div>
    <div>
      <p class="date__label">To date:</p>
      <input
        class="date__input"
        type="date"
        :min="fromDate"
        :max="maxDateAsString"
        v-model="toDate"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      fromDate: undefined,
      toDate: undefined,
    };
  },
  computed: {
    ...mapGetters("dataset", ["minDate", "maxDate"]),
    minDateAsString() {
      return this.toString(this.minDate);
    },
    maxDateAsString() {
      return this.toString(this.maxDate);
    },
  },
  mounted() {
    this.fromDate = this.minDateAsString;
    this.toDate = this.maxDateAsString;
  },
  methods: {
    ...mapActions("dataset", ["setFilteredDates"]),
    toString(date) {
      return date.toISOString().split("T")[0];
    },
    applyFilter() {
      const fromDate = new Date(Date.parse(this.fromDate));
      const toDate = new Date(Date.parse(this.toDate));
      this.setFilteredDates({ from: fromDate, to: toDate });
    },
  },
};
</script>

<style scoped lang="scss">
.date {
  margin-bottom: 10px;

  &__label {
    display: inline;
    margin-right: 10px;
  }
}
</style>
