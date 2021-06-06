<template>
  <div>
    <div id="areaAdjacencyMatrix"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { AdjacencyMatrix } from "../../visualisations/adjacency-matrix";

export default {
  name: "AdjacencyMatrix",
  data() {
    return {
      AdjacencyMatrix: new AdjacencyMatrix(),
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
    redraw() {
      this.AdjacencyMatrix.redraw(this.filteredEmails, this.persons);
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
