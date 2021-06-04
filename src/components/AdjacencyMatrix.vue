<template>
  <div style="text-align: center">
    <div id="areaAdjacencyMatrix" style="padding: 30px"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { AdjacencyMatrixVisualisation } from "@/visualisations/adjacency-matrix";

export default {
  name: "AdjacencyMatrix",
  data() {
    return {
      adjacencyMatrix: new AdjacencyMatrixVisualisation(
        this.changeInspectorData
      ),
    };
  },
  computed: {
    ...mapGetters("dataset", ["filteredEmails", "persons"]),
    ...mapGetters("brush_and_link", ["selectedNodes"]),
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        this.redraw();
      },
    },
    selectedNodes: {
      handler() {
        this.showSelection();
      },
    },
  },
  mounted() {
    this.redraw();
  },
  methods: {
    ...mapActions("dataset", ["changeInspectorData"]),
    redraw() {
      this.adjacencyMatrix.redraw(this.filteredEmails, this.persons);
    },
    showSelection() {
      this.adjacencyMatrix.showSelection(this.selectedNodes);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.svg-content {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
