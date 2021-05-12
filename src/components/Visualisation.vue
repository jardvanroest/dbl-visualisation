<template>
  <div class="container">
    <AdjacencyMatrix v-if="type === 'adjacencymatrix'" />
    <TestVis v-if="type === 'testvis'" />
  </div>
</template>

<script>
import AdjacencyMatrix from "@/components/AdjacencyMatrix.vue";
import TestVis from "@/components/TestVis.vue";

export default {
  name: "Visualisations",
  props: ["type"],
  components: {
    AdjacencyMatrix,
    TestVis,
  },
};
</script>
