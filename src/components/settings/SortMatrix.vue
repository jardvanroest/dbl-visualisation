<template>
  <div class="sort-matrix-container">
    <DropDown
      class="dropdown"
      selected="initial"
      :items="dropdownItems"
      @changed="sortMatrix"
    />
  </div>
</template>

<script>
import * as d3 from "d3";
import * as reorder from "reorder.js";
import DropDown from "@/components/DropDown.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SortMatrix",
  computed: {
    ...mapGetters("dataset", ["persons", "getMatrixDataForSorting"]),
  },
  components: {
    DropDown,
  },
  data() {
    return {
      dropdownItems: [
        { value: "initial", name: "Initial order" },
        { value: "random", name: "Random order" },
        { value: "optimal_leaf", name: "Optimal leaf order" },
        { value: "pca", name: "PCA Order" },
        { value: "spectral", name: "Spectral Order" },
      ],
    };
  },
  methods: {
    ...mapActions("dataset", ["changeSortedMatrixData"]),
    sortMatrix(value) {
      switch (value) {
        case "initial":
          this.changeSortedMatrixData({
            personsRows: this.persons,
            personsCols: this.persons,
          });
          break;
        case "random":
          this.randomSort();
          break;
        case "optimal_leaf":
          this.optimalLeafOrder();
          break;
        case "pca":
          this.pcaSort();
          break;
        case "spectral":
          this.spectralSort();
          break;
        default:
          console.log(value);
      }
    },
    optimalLeafOrder() {
      const matrix = this.getCoefficients(this.getMatrixDataForSorting);

      const transpose = reorder.transpose(matrix),
        dist_rows = reorder.dist()(matrix),
        dist_cols = reorder.dist()(transpose),
        order = reorder.optimal_leaf_order(),
        row_perm = order.distanceMatrix(dist_rows)(matrix),
        col_perm = order.distanceMatrix(dist_cols)(transpose);

      const rows = this.getPermutedPersonArray(row_perm),
        cols = this.getPermutedPersonArray(col_perm);

      this.changeSortedMatrixData({
        personsRows: rows,
        personsCols: cols,
      });
    },
    pcaSort() {
      const matrix = this.getCoefficients(this.getMatrixDataForSorting);

      const perms = reorder.pca_order(matrix);

      this.changeSortedMatrixData({
        personsRows: this.getPermutedPersonArray(perms),
        personsCols: this.getPermutedPersonArray(perms),
      });
    },
    spectralSort() {
      const matrix = this.getCoefficients(this.getMatrixDataForSorting);
      const graph = reorder.mat2graph(matrix);

      const perms = reorder.spectral_order(graph);

      this.changeSortedMatrixData({
        personsRows: this.getPermutedPersonArray(perms),
        personsCols: this.getPermutedPersonArray(perms),
      });
    },
    randomSort() {
      const personsCopy = [...this.persons];

      this.changeSortedMatrixData({
        personsRows: reorder.randomPermute(personsCopy),
        personsCols: reorder.randomPermute(personsCopy),
      });
    },
    getCoefficients(data) {
      // Calculate matrix coefficients
      let _coeffs = [];
      for (let i = 0; i < data.length; i++) {
        let _row = [];
        for (let j = 0; j < data.length; j++) {
          _row.push(data[i][j]._emails.length);
        }
        _coeffs.push(_row);
      }

      return _coeffs;
    },
    getPermutedPersonArray(permutation) {
      let persons = this.persons;
      return d3.permute(persons, permutation);
    },
  },
};
</script>

<style scoped lang="scss">
.sort-matrix-container {
  display: flex;
}
</style>
