<template>
  <Header
    class="header"
    @toggle-settings="toggleSettings"
    @toggle-popup="toggleLinkPopup"
  />
  <Popup v-if="showPopup" @toggle-popup="toggleLinkPopup"> </Popup>
  <div class="grid-container">
    <Visualisations class="vis" />
    <Settings v-if="showSettings" class="settings" />
  </div>
</template>

<script>
import { ref } from "vue";
import Header from "@/components/Header.vue";
import Visualisations from "@/components/Visualisations.vue";
import Settings from "@/components/Settings.vue";
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

.header {
  position: relative;
  z-index: 50;
}
</style>
