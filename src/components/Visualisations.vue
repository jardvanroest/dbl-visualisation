<template>
  <div class="visualisations-cont" id="vis-cont">
    <Visualisation
      v-for="n in amount"
      :key="n"
      class="visualisation"
      :id="'vis' + n"
      :initialType="ids[n % ids.length]"
    />
  </div>
</template>

<script>
import Visualisation from "@/components/Visualisation.vue";

export default {
  name: "Visualisations",
  components: {
    Visualisation,
  },
  props: ["amount"],
  data() {
    return {
      ids: ["CalendarVisualisation", "AdjacencyMatrix", "NodeLink"],
    };
  },
};
</script>

<style scoped lang="scss">
.visualisations-cont {
  margin: 0.75em;
  display: grid;
  grid-gap: 0.75em;
  grid-template-columns: repeat(var(--grd-cols), 1fr);
  grid-template-rows: repeat(var(--grd-rows), 1fr);
}

.visualisations-cont.outlined {
  outline: 0.15rem dashed var(--accent-color-light);
  outline-offset: 0.2rem;
}
</style>
