<template>
  <Header @toggle-settings="toggleSettings" />
  <div class="grid-container" v-bind:class="{ hidenSettings: hideSettings }">
    <Visualisations class="vis" />
    <Settings class="settings" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Visualisations from "@/components/Visualisations.vue";
import Settings from "@/components/Settings.vue";

export default {
  name: "VisualisationPage",
  components: {
    Header,
    Visualisations,
    Settings,
  },
  data() {
    return {
      hideSettings: false,
    };
  },
  methods: {
    toggleSettings() {
      this.hideSettings = !this.hideSettings;
    },
  },
};
</script>

<style scoped>
.grid-container {
  height: calc(100vh - 50px);
  display: grid;
  grid-template-columns: 4fr 1fr;
}

.vis {
  grid-row: 1;
  grid-column: 1;
}

.settings {
  height: 100%;
  grid-row: 1;
  grid-column: 2;
}

/* Hide settings based on class of parent*/
.hidenSettings {
  grid-template-columns: 100%;
}

.hidenSettings > .settings {
  display: none;
}
</style>
