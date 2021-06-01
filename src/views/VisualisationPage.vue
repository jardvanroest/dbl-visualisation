<template>
  <Header class="header" @toggle-settings="toggleSettings" />
  <div class="grid-container">
    <Visualisations class="vis" />
    <div :class="{ hide: !showSettings }" class="wrapper-settings">
      <Settings :class="{ dontShow: !showSettings }" class="settings" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Visualisations from "@/components/visualisations/Visualisations.vue";
import Settings from "@/components/settings/Settings.vue";

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
  margin-top: 3.125rem;
  height: calc(100vh - 3.125rem);
  display: flex;
  background-color: var(--background-color-2);
}

.vis {
  flex-grow: 1;
}

.wrapper-settings {
  width: 18.75rem;
  height: calc(100% - 0.25rem);
  transition: ease 150ms;
  margin-top: 0.25rem;
}

.settings {
  width: 100%;
  height: 100%;
  transition: ease 300ms;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--background-color);
  width: 100%;
  z-index: 50;
}

.dontShow {
  position: fixed;
  pointer-events: none;
  opacity: 0;
}

.hide {
  width: 0;
}
</style>
