<template>
  <Header class="header" @toggle-settings="toggleSettings" />
  <div class="grid-container">
    <Visualisations class="vis" />
    <div :class="{ hide: !showSettings }" class="cont-sett">
      <Settings :class="{ dontShow: !showSettings }" class="settings" />
    </div>
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

<style scoped lang="scss">
.grid-container {
  height: calc(100vh - 3.125rem);
  display: flex;
  overflow: hidden;
}

.vis {
  flex-grow: 1;
}

.cont-sett {
  width: 18.75rem;
  height: 100%;
  transition: ease-in-out 150ms;
}
.settings {
  width: 100%;
  height: 100%;
  transition: ease-in-out 150ms;
}

.header {
  position: relative;
  z-index: 50;
}

.dontShow {
  display: none;
}

.hide {
  width: 0;
}
</style>
