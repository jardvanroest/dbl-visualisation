<template>
  <div class="container">
    <div class="settings">
      <div class="select_mode">
        <ul class="no_highlight">
          <li @click="selectSettings(0)" class="selected"><div>Global</div></li>
          <li @click="selectSettings(1)"><div>Vis1</div></li>
          <li @click="selectSettings(2)"><div>Vis2</div></li>
        </ul>
      </div>
      <div class="selected_setting_type">
        <SettingType text="Global">
          <Setting name="Filter e-mail">
            <EmailFilter />
          </Setting>
        </SettingType>
        <SettingType text="Vis1" class="unselected" />
        <SettingType text="Vis2" class="unselected" />
      </div>
    </div>
    <Inspector class="inspector" />
  </div>
</template>

<script>
import Inspector from "@/components/Inspector.vue";
import SettingType from "@/components/SettingType.vue";
import Setting from "@/components/Setting.vue";
import EmailFilter from "@/components/EmailFilter.vue";

export default {
  name: "Settings",
  components: {
    Inspector,
    SettingType,
    Setting,
    EmailFilter,
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
          "selected_setting_type"
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
          "selected_setting_type"
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

<style scoped>
div {
  --settings-border: 2px solid var(--border-color);
}

/* Settings occupies 60% of the space */
.settings {
  display: flex;
  flex-direction: column;
  height: 60%;
}

/* Occupy remaining space */
.selected_setting_type,
.inspector {
  flex-grow: 1;
}

/* Line on the left of settings tab */
.container .settings::before {
  z-index: 1000;
  content: "";
  display: block;

  position: absolute;
  top: 70px;
  height: calc(100vh - 71px);
  width: 0;

  border-left: var(--settings-border);
}

/* Settings type selection */
.select_mode ul {
  padding: 0;
  margin: 0;
  margin-top: 5px;
  display: flex;
  justify-content: flex-start;

  list-style-type: none;
}

.select_mode ul :hover {
  color: var(--accent-color);
}

.select_mode li {
  display: table;

  width: 95px;
  height: 30px;
  margin-right: 5px;

  background-color: rgba(0, 0, 0, 0.025);
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  border: var(--settings-border);
  border-bottom: 0;
}

/* Center text in settings type selection */
.select_mode li div {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

/* Line under settings type selection */
.select_mode::after {
  z-index: -1;
  content: "";
  display: block;

  position: relative;
  top: -2px;
  height: 0x;
  width: 300px;

  border-bottom: var(--settings-border);
}

/* Make open space for the selected settings type on bottom */
.select_mode ul .selected {
  background-color: var(--background-color);
  color: var(--accent-color-2);
  transition: step-start 200ms;
}

/* Show only selected settings */
.selected_setting_type .unselected {
  display: none;
}
</style>
