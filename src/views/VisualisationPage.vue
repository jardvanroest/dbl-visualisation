<template>
  <Popup v-if="showPopup" @toggle-popup="toggleLinkPopup"> </Popup>
  <Header
    class="header"
    @toggle-settings="toggleSettings"
    @toggle-popup="toggleLinkPopup"
  />
  <div class="grid-container">
    <Visualisations class="visualisations-cont" />
    <div :class="{ hide: !showSettings }" class="wrapper-settings">
      <Settings
        :class="{ dontShow: !showSettings }"
        class="container-settings"
      />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Visualisations from "@/components/Visualisations.vue";
import Settings from "@/components/settings/Settings.vue";
import Popup from "@/components/Popup.vue";

export default {
  name: "VisualisationPage",
  components: {
    Header,
    Visualisations,
    Settings,
    Popup,
  },
  data() {
    return {
      showSettings: true,
      showPopup: false,
    };
  },
  methods: {
    toggleLinkPopup() {
      this.showPopup = !this.showPopup;
    },
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
  width: var(--stt-width);
  transition: ease 150ms;
  flex-shrink: 0;
}

.container-settings {
  --stt-height: calc(100vh - var(--hdr-size) - var(--brdr-size));

  width: 100%;
  height: min(100%, var(--stt-height));
  transition: ease 300ms;

  background-color: var(--background-color);
  border: var(--settings-border);
  border-top: none;
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

@media (max-width: 525px) {
  .grid-container {
    flex-direction: column;
  }
  .wrapper-settings {
    position: absolute;
    top: var(--hdr-size);
    right: 0;

    height: 100%;
    width: 100%;
  }
}
</style>
