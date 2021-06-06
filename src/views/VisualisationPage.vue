<template>
  <Header class="header" @toggle-settings="toggleSettings" />
  <div class="grid-container">
    <Visualisations class="visualisations-cont" />
    <div :class="{ hide: !showSettings }" class="wrapper-settings">
      <Settings :class="{ dontShow: !showSettings }" class="settings" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Visualisations from "@/components/Visualisations.vue";
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
  display: flex;
  margin-top: var(--hdr-size);
  min-height: calc(100vh - var(--hdr-size));
  background-color: var(--background-color-2);
  overflow-x: hidden;
}

.visualisations-cont {
  width: 100%;
  height: fit-content;
}

.wrapper-settings {
  width: 18.75rem;
  transition: ease 150ms;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.settings {
  --stt-height: calc(100vh - var(--hdr-size));

  width: 100%;
  height: min(100%, var(--stt-height));
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
