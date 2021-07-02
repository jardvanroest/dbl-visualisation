<template>
  <div class="container-settings">
    <div class="settings">
      <Section title="General" fields="none" />
      <Setting name="Interaction Mode">
        <InteractionMode />
      </Setting>
      <Setting name="Sorting algorithm">
        <SortMatrix />
      </Setting>
      <div class="filters-container">
        <Section title="Global filters" fields="none" />
        <Btn class="apply-filters" text="Apply filters" @click="applyFilters" />
        <Setting name="By e-mail">
          <EmailFilter ref="emailFilter" />
        </Setting>
        <Setting name="By job title">
          <JobtitleFilter ref="jobTitleFilter" />
        </Setting>
        <Setting name="By date">
          <DateFilter ref="dateFilter" />
        </Setting>
      </div>
      <Section title="Layout" fields="none" />
      <Layout
        @change-vis-amount="$emit('change-vis-amount', $event)"
        @change-column-num="$emit('change-column-num', $event)"
        @change-row-num="$emit('change-row-num', $event)"
      />
    </div>
    <Inspector class="inspector" />
  </div>
</template>

<script>
import Section from "@/components/inspector/Section.vue";
import Inspector from "@/components/inspector/Inspector.vue";
import Setting from "@/components/settings/Setting.vue";
import EmailFilter from "@/components/settings/EmailFilter.vue";
import SortMatrix from "@/components/settings/SortMatrix.vue";
import DateFilter from "@/components/settings/DateFilter.vue";
import Layout from "@/components/settings/Layout.vue";
import JobtitleFilter from "@/components/settings/JobtitleFilter.vue";
import InteractionMode from "@/components/settings/InteractionMode.vue";
import Btn from "@/components/buttons/Btn.vue";

export default {
  name: "Settings",
  components: {
    Section,
    Inspector,
    Setting,
    EmailFilter,
    SortMatrix,
    JobtitleFilter,
    InteractionMode,
    DateFilter,
    Layout,
    Btn,
  },
  data() {
    return {
      lastSelected: 0,
    };
  },
  methods: {
    applyFilters() {
      this.$refs.emailFilter.applyFilter();
      this.$refs.jobTitleFilter.applyFilter();
      this.$refs.dateFilter.applyFilter();
    },
  },
};
</script>

<style scoped lang="scss">
.container-settings {
  --padding: 0.5rem;
  border-bottom-left-radius: var(--border-rad);
}

.settings {
  display: flex;
  flex-direction: column;
  height: calc(100% - 32.5vh - var(--padding));
  padding-left: 5%;

  font-size: 0.8125rem;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: var(--padding);
}

.inspector {
  padding: var(--padding) 0;
  border-top: var(--settings-border);

  height: calc(32.5vh - 2 * var(--padding));
}

.filters-container {
  position: relative;
  width: 100%;
  height: fit-content;
}

.apply-filters {
  position: absolute;
  top: 0.5em;
  right: 1.5em;

  width: fit-content;
  background-color: var(--background-color);
}
</style>
