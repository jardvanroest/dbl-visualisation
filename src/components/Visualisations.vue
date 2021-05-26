<template>
  <div class="container">
    <AdjacencyMatrix class="vis1" />
    <NodeLinkSVG class="vis2" />
  </div>
</template>

<script>
import NodeLinkSVG from "@/components/Visualisations/Node-Link/NodeLinkSVG.vue";
import AdjacencyMatrix from "@/components/Visualisations/AdjacencyMatrix.vue";

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
  background-color: var(--background-color-2);
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
