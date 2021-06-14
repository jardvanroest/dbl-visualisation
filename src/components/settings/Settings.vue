<template>
  <div class="container-settings">
    <div class="settings">
      <Section title="General" fields="none" />
      <Setting name="Interaction Mode">
        <InteractionMode />
      </Setting>
      <div class="filters-container">
        <Section title="Filters" fields="none" />
        <Btn class="apply-filters" text="Apply filters" @click="applyFilters" />
        <Setting name="By e-mail">
          <EmailFilter ref="emailFilter" />
        </Setting>
        <Setting name="By job title">
          <JobtitleFilter ref="jobTitleFilter" />
        </Setting>
      </div>
    </div>
    <Inspector class="inspector" />
  </div>
</template>

<script>
import Section from "@/components/inspector/Section.vue";
import Inspector from "@/components/inspector/Inspector.vue";
import Setting from "@/components/settings/Setting.vue";
import EmailFilter from "@/components/settings/EmailFilter.vue";
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
    JobtitleFilter,
    InteractionMode,
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
    },
    selectSettings(n) {
      // Don't switch settings type if nothing changed
      if (this.lastSelected != n) {
        // Get the newly selected selection li
        var selection = document.getElementsByClassName("select_mode")[0]
          .children[0].children;

        // Unselect previous selected settings type
        selection[this.lastSelected].classList.remove("selected");

        // Select current selected settings type
        selection[n].classList.add("selected");

        // Get the newly selected settingsType element
        var selSettingsType = document.getElementsByClassName(
          "container-settingType"
        )[0].children;

        // Unselect previous selected settings type
        selSettingsType[this.lastSelected].classList.add("unselected");

        // Select current selected settings type
        selSettingsType[n].classList.remove("unselected");

        // Update lastSelected
        this.lastSelected = n;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container-settings {
  --padding: 0.5rem;
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
