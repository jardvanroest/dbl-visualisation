<template>
  <div class="container-settings">
    <div class="settings">
      <Section title="General" fields="none" />
      <Setting name="Sorting algorithm" flexRow="yes">
        <SortMatrix />
      </Setting>
      <Setting name="Filter e-mail">
        <EmailFilter />
      </Setting>
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

export default {
  name: "Settings",
  components: {
    Section,
    Inspector,
    Setting,
    EmailFilter,
    SortMatrix,
  },
  data() {
    return {
      lastSelected: 0,
    };
  },
  methods: {
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
.settings {
  display: flex;
  flex-direction: column;
  height: calc(100% - 32.5vh);
  padding-left: 5%;

  font-size: 0.8125rem;
  overflow-y: auto;
  overflow-x: hidden;
  border-bottom: var(--settings-border);
}

.inspector {
  padding: 1em 0;
  height: calc(32.5vh - 2em);
}
</style>
