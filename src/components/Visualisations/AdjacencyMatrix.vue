<template>
  <div>
    <div id="areaAdjacencyMatrix"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { AdjacencyMatrix } from "@/visualisations/adjacency-matrix";

export default {
  name: "AdjacencyMatrix",
  data() {
    return {
      adjacencyMatrix: new AdjacencyMatrix(this.changeInspectorData),
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
      this.adjacencyMatrix.redraw(this.filteredEmails, this.persons);
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
