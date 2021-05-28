<template>
  <div class="sort-container">
    <div class="sort-select">
      <select id="sorting-selector" @change="sortMatrix">
        <option value="unsorted">Unsorted</option>
        <option value="transposed">Transposed</option>
      </select>
      <span class="custom-arrow" />
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SortMatrix",
  computed: {
    ...mapGetters("dataset", ["getMatrixData", "getSortedMatrixData"]),
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
      // TODO: make loading bar
      let data = this.getMatrixData;
      // let coeffs = this.getCoefficients();

      // Do the selected sorting algorithm
      this.sortAlg["type"] = event.target.value;
      this.sortAlg["index"] = event.target.options.selectedIndex;

      switch (this.sortAlg["type"]) {
        case "unsorted":
          this.changeSortedMatrixData("unsorted");
          break;
        case "transposed":
          this.changeSortedMatrixData(this.transposeMatrix(data));
          break;
        default:
          console.log(this.sortAlg["type"]);
      }
    },
    getCoefficients() {
      let data = this.getMatrixData;

      // Calculate matrix coefficients by taking the weights
      let _coeffs = [];
      for (let i = 0; i < data.length; i++) {
        let _row = [];
        for (let j = 0; j < data.length; j++) {
          _row.push(data[i][j]["weight"]);
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
