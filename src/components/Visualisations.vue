<template>
  <div class="container">
    <AdjacencyMatrix class="visualisation" />
    <NodeLinkSVG class="visualisation" />
  </div>
</template>

<script>
import NodeLinkSVG from "@/components/Cal.vue";
import AdjacencyMatrix from "@/components/AdjacencyMatrix.vue";

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
  display: flex;
  background-color: var(--background-color-2);
}

.visualisation {
  width: 0;
  flex-grow: 1;
}
</style>
