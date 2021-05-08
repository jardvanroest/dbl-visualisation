<template>
  <Header @toggle-settings="toggleSettings" />
  <div class="grid-container">
    <Visualisations class="vis" />
    <Settings v-if="showSettings" class="settings" />
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
      showSettings: true,
    };
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
  },
};
</script>

<style scoped>
.grid-container {
  height: calc(100vh - 50px);
  display: flex;
}

.vis {
  flex-grow: 1;
}

.settings {
  width: 300px;
  height: 100%;
}
</style>
