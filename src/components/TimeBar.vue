<template>
  <div class="timebar">
    <div class="total" />
    <div
      class="global"
      :style="{ left: globalMin + '%', width: globalWidth + '%' }"
    />
    <div
      class="local"
      :style="{
        left: localMin + '%',
        width: localWidth + '%',
        display: displayLocalFilter,
      }"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TimeBar",
  props: ["dates", "doLocalFilter"],
  data() {
    return {
      globalMin: 20,
      globalWidth: 70,
      localMin: 30,
      localWidth: 30,
      displayLocalFilter: "none",
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
    doLocalFilter: {
      deep: true,
      handler(value) {
        if (value) this.displayLocalFilter = "inline";
        else this.displayLocalFilter = "none";
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

<style lang="scss">
.total {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-bottom: 0.4em solid var(--background-color-2);
  border-radius: var(--border-rad);
}

.global {
  position: absolute;
  bottom: 0;
  border-bottom: 0.4em solid #c9c9c9af;
  border-radius: var(--border-rad);
}

[data-theme="dark"] {
  .global {
    border-bottom-color: #353535af;
  }
}

.local {
  position: absolute;
  bottom: 0;
  border-bottom: 0.4em solid var(--accent-color);
  border-radius: var(--border-rad);
}
</style>
