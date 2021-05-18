<template>
  <div class="container">
    <AdjacencyMatrix class="vis1" />
    <NodeLinkCanvas class="vis2" />
  </div>
</template>

<script>
import NodeLinkCanvas from "@/components/NodeLinkCanvas.vue";
import AdjacencyMatrix from "@/components/AdjacencyMatrix.vue";

export default {
  name: "Visualisations",
  components: {
    AdjacencyMatrix,
    NodeLinkCanvas,
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
