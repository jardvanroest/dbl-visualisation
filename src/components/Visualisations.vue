<template>
  <div class="container">
    <AdjacencyMatrix class="visualisation" />
    <Calendar class="visualisation" />
  </div>
</template>

<script>
import Calendar from "@/components/Calendar.vue";
import AdjacencyMatrix from "@/components/AdjacencyMatrix.vue";

export default {
  name: "Visualisations",
  components: {
    AdjacencyMatrix,
    Calendar,
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
