<template>
  <div class="container">
    <AdjacencyMatrix class="vis1" />
    <NodeLinkSVG class="vis2" />
  </div>
</template>

<script>
import NodeLinkSVG from "@/visualisations/node-link/NodeLinkSVG.vue";
import AdjacencyMatrix from "@/visualisations/AdjacencyMatrix.vue";

export default {
  name: "Visualisations",
  components: {
    AdjacencyMatrix,
    NodeLinkSVG,
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.vis1 {
  grid-row: 1;
  grid-column: 1;
}

.vis2 {
  grid-row: 1;
  grid-column: 2;
}
</style>
