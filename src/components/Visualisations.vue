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
  display: grid;
  grid-auto-flow: column;
}

.visualisations-cont *:first-child {
  margin-left: var(--margin-size);
}
</style>
