<template>
  <div class="visualisation-page-container">
    <Popup v-if="showPopup" @toggle-popup="toggleLinkPopup"> </Popup>
    <Header
      class="header"
      @toggle-settings="toggleSettings"
      @toggle-popup="toggleLinkPopup"
    />
    <div class="grid-container">
      <Visualisations class="visualisations-cont" :amount="amount" />
      <div :class="{ hide: !showSettings }" class="wrapper-settings">
        <Settings
          @change-vis-amount="changeVisAmount"
          @change-column-num="changeColumnNum"
          @change-row-num="changeRowNum"
          :class="{ dontShow: !showSettings }"
          class="container-settings"
        />
      </div>
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
      amount: 2,
    };
  },
  methods: {
    changeVisAmount(amount) {
      this.amount = amount;
    },
    changeColumnNum(number) {
      const r = document.querySelector(".visualisation-page-container");
      r.style.setProperty("--grd-cols", number);
    },
    changeRowNum(number) {
      const r = document.querySelector(".visualisation-page-container");
      r.style.setProperty("--grd-rows", number);
    },
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
.visualisation-page-container {
  position: relative;

  --grd-cols: 2;
  --grd-rows: 1;
  --vis-nums: 2;
}

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
  height: var(--stt-height);
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
    --grd-cols: 1;
  }

  .wrapper-settings {
    position: absolute;
    top: 0;
    right: 0;

    height: 100%;
    width: 100%;
  }
}
</style>
