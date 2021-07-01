<template>
  <div class="vis-sett-cont">
    <Btn @click="toggleMenu" text="Local Settings" class="btn-local-sett" />
    <div class="vis-settings" :style="{ display: display }">
      <div v-if="vis_id == 'CalendarVisualisation'" class="coloring-mode">
        <Section title="Color by" fields="none" />
        <ColoringByParameter @updateColor="updateColoringMode" class="col" />
      </div>
      <div class="local-filters">
        <Section title="Local Filters" fields="none" />
        <Btn class="enable-btn" :text="enableBtn" @click="toggleDateFilter" />
        <Btn
          class="apply-filters"
          :style="{ display: displayDateFilter }"
          text="Apply filters"
          @click="applyFilters"
        />
        <Setting name="By date" :style="{ display: displayDateFilter }">
          <LocalDateFilter
            ref="dateFilter"
            :dates="dates"
            @setFilteredDates="setFilteredDates"
          />
        </Setting>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Btn from "@/components/buttons/Btn.vue";
import Section from "@/components/inspector/Section.vue";
import Setting from "@/components/settings/Setting.vue";
import LocalDateFilter from "@/components/settings/LocalDateFilter.vue";
import ColoringByParameter from "@/components/settings/ColoringByParameter.vue";
export default {
  name: "VisualisationSettings",
  props: ["dates", "vis_id"],
  components: {
    Btn,
    Section,
    Setting,
    LocalDateFilter,
    ColoringByParameter,
  },
  data() {
    return {
      showLocalSettings: false,
      filteredDates: this.dates,
      display: "none",
      doDateFilter: false,
      enableBtn: "Enable",
      displayDateFilter: "none",
    };
  },
  computed: {
    ...mapGetters("dataset", ["getDatasetLink"]),
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
    changeColoring() {
      this.$emit("color_change", this.$refs.vi_coloring_dropdown.value);
    },
    setFilteredDates(filteredDates) {
      this.filteredDates = filteredDates;
    },
    toggleDateFilter() {
      this.doDateFilter = !this.doDateFilter;
      if (this.doDateFilter) {
        this.displayDateFilter = "inline";
        this.enableBtn = "Disable";
      } else {
        this.displayDateFilter = "none";
        this.enableBtn = "Enable";
      }
      this.$emit("setDateFilter", this.doDateFilter);
    },
    updateColoringMode(val) {
      this.$emit("color_change", val);
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
  padding-right: 0;
  padding-top: 0;

  background-color: var(--background-color);
  border: var(--settings-border);
  border-radius: var(--border-rad);
  font-size: 1rem;
}

.coloring-mode .col {
  margin: 0.5rem;
}

.local-filters {
  position: relative;
}

.apply-filters {
  margin-left: 1em;
  position: absolute;
  right: var(--vs-padd);
  top: -1em;
  background-color: var(--background-color);
}

.enable-btn {
  width: calc(100% - var(--vs-padd));
  margin-top: 0.5em;
}

.btn-local-sett {
  background-color: var(--background-color);
  border: var(--settings-border);
}
</style>
