<template>
  <div class="sort-container">
    <div class="sort-select">
      <select id="sorting-selector" @change="sortMatrix">
        <option value="unsorted">Unsorted</option>
        <option value="rotate180">Rotate 180°</option>
        <option value="cuthill–mckee">Cuthill–McKee</option>
        <option value="random">Random Sorting</option>
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
    ...mapGetters("dataset", [
      "getMatrixData",
      "persons",
      "getSortedMatrixData",
    ]),
  },
  data() {
    return {
      sortAlg: { type: "unsorted", index: 0 },
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
      // TODO: fix coeffs
      //let data = this.getMatrixData;
      //let coeffs = this.getCoefficients();
      //this.changeSortedMatrixData(this.transposeMatrix(this.people));

      // Do the selected sorting algorithm
      this.sortAlg["type"] = event.target.value;
      this.sortAlg["index"] = event.target.options.selectedIndex;

      let reversePeople = this.persons.reverse();

      switch (this.sortAlg["type"]) {
        case "unsorted":
          this.changeSortedMatrixData({
            personsRows: this.persons,
            personsCols: this.persons,
          });
          break;
        case "rotate180":
          this.changeSortedMatrixData({
            personsRows: reversePeople,
            personsCols: reversePeople,
          });
          break;
        case "cuthill–mckee":
          this.cuthillMcKeeSort();
          break;
        case "random":
          this.randomSort();
          break;
        default:
          console.log(this.sortAlg["type"]);
      }
    },
    cuthillMcKeeSort() {
      this.changeSortedMatrixData({
        personsRows: this.persons,
        personsCols: this.persons,
      });
    },
    randomSort() {
      console.log("random sort");

      this.changeSortedMatrixData({
        personsRows: reorder.randomPermute(this.persons),
        personsCols: reorder.randomPermute(this.persons),
      });
    },
    getCoefficients() {
      let data = this.getMatrixData;

      // Calculate matrix coefficients by taking the weights
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
    permuteMatrix(matrix, permRows, permColumns) {
      // Transpose matrix so it permutes the columns
      matrix = this.transposeMatrix(matrix);
      matrix = d3.permute(matrix, permColumns);

      // Transpose back to original and permute rows
      matrix = this.transposeMatrix(matrix);
      matrix = d3.permute(matrix, permRows);

      return matrix;
    },
    transposeMatrix(matrix) {
      return matrix.reduce(
        (prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i])),
        []
      );
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
