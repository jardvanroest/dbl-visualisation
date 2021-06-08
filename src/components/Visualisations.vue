<template>
  <div class="visualisations-cont">
    <Visualisation class="visualisation" id="AdjacencyMatrix" />
    <Visualisation class="visualisation" id="NodeLink" />
  </div>
</template>

<script>
import Visualisation from "@/components/Visualisation.vue";

export default {
  name: "Visualisations",
  components: {
    Visualisation,
  },
};
</script>

<style scoped lang="scss">
.visualisations-cont {
  margin: 0.75em;
  display: grid;
  grid-auto-flow: var(--grd-dir);
  grid-gap: 0.75em;
}
</style>
