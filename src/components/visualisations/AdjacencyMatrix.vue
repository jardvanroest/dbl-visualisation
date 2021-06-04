<template>
  <div>
    <div id="areaAdjacencyMatrix"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { AdjacencyMatrixVisualisation } from "../../visualisations/adjacency-matrix";

export default {
  name: "AdjacencyMatrix",
  data() {
    return {
      AdjacencyMatrixVisualisation: new AdjacencyMatrixVisualisation(),
    };
  },
  computed: {
    ...mapGetters("dataset", ["filteredEmails", "persons"]),
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        this.redraw();
      },
    },
  },
  mounted() {
    this.redraw();
  },
  methods: {
    ...mapActions("dataset", ["changeInspectorData"]),
    redraw() {
      this.AdjacencyMatrixVisualisation.redraw(
        this.filteredEmails,
        this.persons
      );
    },
  },
};
</script>

<style scoped>
.svg-content {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
