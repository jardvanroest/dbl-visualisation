<template>
  <div class="container">
    <Visualisation class="vis1" />
    <Visualisation class="vis2" />
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
