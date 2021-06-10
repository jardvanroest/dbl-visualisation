<template>
  <div class="date-filter-container">
    <div class="date">
      <p class="date__label">From date:</p>
      <input
        class="date__input"
        type="date"
        :min="minDate"
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
        :max="maxDate"
        v-model="toDate"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minDate: "1999-12-23",
      fromDate: "2000-01-01",
      toDate: "2021-06-10",
      maxDate: "2021-06-20",
    };
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
