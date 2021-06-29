<template>
  <div class="container">
    <div class="total"></div>
    <div
      class="global"
      :style="{ left: globalMin + '%', width: globalWidth + '%' }"
    ></div>
    <div
      class="local"
      :style="{ left: localMin + '%', width: localWidth + '%' }"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TimeBar",
  props: ["dates"],
  data() {
    return {
      globalMin: 20,
      globalWidth: 70,
      localMin: 30,
      localWidth: 30,
    };
  },
  computed: {
    ...mapGetters("dataset", ["minDate", "maxDate", "filteredDates"]),
    minTime() {
      return this.minDate.getTime();
    },
    maxTime() {
      return this.maxDate.getTime();
    },
    totalTime() {
      return this.maxDate.getTime() - this.minDate.getTime();
    },
  },
  mounted() {
    this.globalMin =
      ((this.filteredDates.from.getTime() - this.minTime) / this.totalTime) *
      100;
    this.globalWidth =
      ((this.filteredDates.to.getTime() - this.filteredDates.from.getTime()) /
        this.totalTime) *
      100;
    this.localMin = this.globalMin;
    this.localWidth = this.globalWidth;
  },
  watch: {
    dates: {
      deep: true,
      handler(value) {
        this.localMin =
          ((value.from.getTime() - this.minTime) / this.totalTime) * 100;
        this.localWidth =
          ((value.to.getTime() - value.from.getTime()) / this.totalTime) * 100;
      },
    },
    filteredDates: {
      deep: true,
      handler(value) {
        this.globalMin =
          ((value.from.getTime() - this.minTime) / this.totalTime) * 100;
        this.globalWidth =
          ((value.to.getTime() - value.from.getTime()) / this.totalTime) * 100;

        if (this.globalMin > this.localMin) {
          this.localMin = this.globalMin;
          this.localWidth -= this.globalMin - this.localMin;
        }

        if (
          this.globalMin + this.globalWidth <
          this.localMin + this.localWidth
        ) {
          this.localWidth -=
            this.localMin +
            this.localWidth -
            (this.globalMin + this.globalWidth);
        }
      },
    },
  },
};
</script>

<style>
.container {
  position: absolute;
  width: 100%;
  bottom: 2em;
}
.total {
  position: absolute;
  bottom: 0;
  border-bottom: 6px solid var(--border-color);
  width: 100%;
  border-radius: var(--border-rad);
}
.global {
  position: absolute;
  bottom: 0;
  border-bottom: 6px solid var(--accent-color);
  left: 50%;
  width: 100%;
  border-radius: var(--border-rad);
}
.local {
  position: absolute;
  bottom: 0;
  border-bottom: 6px solid var(--accent-color-2);
  left: 75%;
  width: 100%;
  border-radius: var(--border-rad);
}
</style>
