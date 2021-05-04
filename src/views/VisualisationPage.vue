<template>
  <Header :style="cssProps"></Header>
  <div class="grid-container">
    <Visualisations class="vis" :style="cssProps" />
    <Settings class="settings" :style="cssProps" />
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
  computed: {
    cssProps() {
      return {
        "--accent-color": "#73cdc2",
      };
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

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
  grid-row: 1;
  grid-column: 2;
}
</style>
