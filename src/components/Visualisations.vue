<template>
  <div class="container">
    <AdjacencyMatrix class="vis1" />
    <Visualisation class="vis2" />
  </div>
</template>

<script>
import Visualisation from "@/components/Visualisation.vue";
import AdjacencyMatrix from "@/components/AdjacencyMatrix.vue";

export default {
  name: "Visualisations",
  components: {
    Visualisation,
    AdjacencyMatrix,
  },
};
</script>

<style scoped>
.container {
  display: grid;
  /*
  grid-template-columns: 1fr 1fr;
   */
  grid-template-columns: 1fr;
}
.vis1 {
  grid-row: 1;
  grid-column: 1;
}

.vis2 {
  display: none;
  /* 
  grid-row: 1;
  grid-column: 2;
  */
}
</style>
