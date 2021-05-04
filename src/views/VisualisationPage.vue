<template>
  <Header />
  <div class="grid-container">
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
  grid-row: 1;
  grid-column: 2;
}
</style>
