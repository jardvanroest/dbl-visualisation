<template>
  <div class="container">
    <Visualisation class="visualisation" id="vis1" />
    <Visualisation class="visualisation" id="vis2" />
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
  display: flex;
  background-color: var(--background-color-2);
}

.visualisation {
  width: 0;
  flex-grow: 1;
}
</style>
