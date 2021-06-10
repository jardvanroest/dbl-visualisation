<template>
  <div class="sort-container">
    <div class="sort-select">
      <select id="sorting-selector" @change="sortMatrix">
        <option value="initial">Initial Order</option>
        <option value="random">Random Order</option>
        <option value="optimal_leaf">Optimal Leaf Order</option>
        <option value="pca">PCA Order</option>
        <option value="spectral">Spectral Order</option>
      </select>
      <span class="custom-arrow" />
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as reorder from "reorder.js";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SortMatrix",
  computed: {
    ...mapGetters("dataset", ["persons", "getMatrixDataForSorting"]),
  },
  data() {
    return {
      sortAlg: { type: "initial", index: 0 },
    };
  },
  mounted() {
    // NOT WORKING make selected option stay the same even after settings being hidden
    const select = document.getElementById("sorting-selector");
    select.selectedIndex = this.sortAlg["index"];
  },
  methods: {
    ...mapActions("dataset", ["changeSortedMatrixData"]),
    sortMatrix(event) {
      // Do the selected sorting algorithm
      this.sortAlg["type"] = event.target.value;
      this.sortAlg["index"] = event.target.options.selectedIndex;

      // TODO: this.getMatrixDataForSorting is not filtered?
      switch (this.sortAlg["type"]) {
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
          console.log(this.sortAlg["type"]);
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
      // Calculate matrix coefficients (only 1 and 0)
      let _coeffs = [];
      for (let i = 0; i < data.length; i++) {
        let _row = [];
        for (let j = 0; j < data.length; j++) {
          _row.push(data[i][j]._emails.length != 0);
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
.sort-container {
  display: flex;
}

.sort-select {
  font: inherit;
  position: relative;
}

#sorting-selector {
  border-radius: 0.32em;
  padding: 0.3em 1.5em 0.3em 0.3em;
  background-color: var(--background-color);
  border: var(--settings-border);

  &:focus {
    border: 2px solid black;
  }
  &:focus * {
    color: var(--accent-color);
  }
  &:focus + .custom-arrow {
    border: 2px solid black;
    border-left: 0;
  }
}

/* Make custom arrow for drop-down menu */
.custom-arrow {
  display: block;
  position: absolute;

  top: 0;
  right: 0;
  height: calc(100% - 4px);
  width: 2em;

  border: var(--settings-border);
  border-left: 0;
  border-top-right-radius: 0.32em;
  border-bottom-right-radius: 0.32em;
  background: var(--accent-color);
  pointer-events: none;
}

.custom-arrow::before,
.custom-arrow::after {
  --size: 0.45em;

  content: "";
  position: absolute;
  width: 0;
  height: 0;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
}

.custom-arrow::before {
  border-bottom: var(--size) solid var(--background-color);
  top: 35%;
}

.custom-arrow::after {
  border-top: var(--size) solid var(--background-color);
  top: 65%;
}
</style>
