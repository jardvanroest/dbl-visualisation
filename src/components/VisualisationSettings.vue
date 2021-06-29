<template>
  <div class="vis-sett-cont">
    <Btn @click="toggleMenu" text="x" class="btn-local-sett" />
    <div class="vis-settings" :style="{ display: display }">
      <Section title="Local Filters" fields="none" />
      <Btn class="apply-filters" text="Apply filters" @click="applyFilters" />
      <Setting name="By date">
        <LocalDateFilter
          ref="dateFilter"
          :dates="dates"
          @setFilteredDates="setFilteredDates"
        />
      </Setting>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Btn from "@/components/buttons/Btn.vue";
import Section from "@/components/inspector/Section.vue";
import Setting from "@/components/settings/Setting.vue";
import LocalDateFilter from "@/components/settings/LocalDateFilter.vue";

export default {
  name: "VisualisationSettings",
  props: ["dates"],
  components: {
    Btn,
    Section,
    Setting,
    LocalDateFilter,
  },
  data() {
    return {
      showLocalSettings: false,
      filteredDates: this.dates,
      display: "none",
      doDateFilter: true,
    };
  },
  computed: {
    ...mapGetters("dataset", ["getDatasetLink"]),
  },
  mounted() {
    console.log("dates: " + this.dates);
  },
  methods: {
    toggleMenu() {
      this.showLocalSettings = !this.showLocalSettings;
      if (this.showLocalSettings) this.display = "inline";
      else this.display = "none";
    },
    applyFilters() {
      this.$emit("apply", this.filteredDates);
    },
    setFilteredDates(filteredDates) {
      this.filteredDates = filteredDates;
    },
    toggleDateFilter() {
      this.doDateFilter = !this.doDateFilter;
    },
  },
};
</script>

<style lang="scss" scoped>
.vis-settings {
  position: absolute;
  top: 2.5em;
  right: 0;

  --vs-padd: 1em;
  width: var(--stt-width);
  padding: var(--vs-padd);

  background-color: var(--background-color);
  border: var(--settings-border);
  border-radius: var(--border-rad);
  font-size: 1rem;
}

.apply-filters {
  margin-left: 1em;
  position: absolute;
  right: var(--vs-padd);
  top: var(--vs-padd);
  background-color: var(--background-color);
}

.btn-local-sett {
  background-color: var(--background-color);
  border: var(--settings-border);
}
</style>
