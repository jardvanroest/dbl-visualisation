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
      AdjacencyMatrixVisualisation: new AdjacencyMatrixVisualisation(
        this.changeInspectorData
      ),
    };
  },
  computed: {
    ...mapGetters("dataset", [
      "filteredEmails",
      "persons",
      "getSortedMatrixData",
    ]),
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        this.redraw(this.persons, this.persons);
      },
    },
    // Watch for new incoming {sortedMatrixData}
    getSortedMatrixData(newData) {
      this.redraw(newData.personsRows, newData.personsCols);
    },
  },
  mounted() {
    this.redraw(this.persons, this.persons);
  },
  methods: {
    ...mapActions("dataset", ["changeInspectorData"]),
    redraw(personsRows, personsCols) {
      this.AdjacencyMatrixVisualisation.redraw(
        this.filteredEmails,
        personsRows,
        personsCols
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
