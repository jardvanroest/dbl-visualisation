<template>
  <div class="date-filter-container">
    <div class="from-container">
      <p class="date-label">From:</p>
      <input
        class="date-input"
        type="date"
        :min="minDateAsString"
        :max="toDate"
        v-model="fromDate"
      />
    </div>
    <div class="to-container">
      <p class="date-label">To:</p>
      <input
        class="date-input"
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
  props: ["dates"],
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
    this.fromDate = this.toString(this.dates["from"]);
    this.toDate = this.toString(this.dates["to"]);
  },
  watch: {
    fromDate: {
      deep: true,
      handler(value) {
        this.changed();
      },
    },
    toDate: {
      deep: true,
      handler(value) {
        this.changed();
      },
    },
  },
  methods: {
    toString(date) {
      return date.toISOString().split("T")[0];
    },
    changed() {
      const fromDate = new Date(Date.parse(this.fromDate));
      const toDate = new Date(Date.parse(this.toDate));
      this.$emit("setFilteredDates", { from: fromDate, to: toDate });
    },
  },
};
</script>

<style scoped lang="scss">
.from-container,
.to-container {
  display: flex;
  align-items: center;
  gap: 1em;

  margin-left: 0.75em;
}

input[type="date"] {
  height: fit-content;
  padding: 0.25em;
  border: var(--settings-border);
  border-radius: var(--border-rad);

  &:hover,
  :focus {
    border-color: black;
  }
}
</style>
