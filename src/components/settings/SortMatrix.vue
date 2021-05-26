<template>
  <div class="sort-container">Test</div>
  <Btn @click="sortMatrix" text="Sort Matrix" />
</template>

<script>
import * as d3 from "d3";
import Btn from "@/components/Btn.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SortMatrix",
  components: {
    Btn,
  },
  computed: {
    ...mapGetters("dataset", ["getMatrixData", "getSortedMatrixData"]),
  },
  data() {
    return {
      sortAlg: "transposed",
    };
  },
  methods: {
    ...mapActions("dataset", ["changeSortedMatrixData"]),
    sortMatrix() {
      let data = this.getMatrixData;
      // let coeffs = this.getCoefficients();

      // Do the selected sorting algorithm
      switch (this.sortAlg) {
        case "unsorted":
          this.changeSortedMatrixData("unsorted");
          break;
        case "transposed":
          this.changeSortedMatrixData(this.transposeMatrix(data));
          break;
        default:
          console.log(this.sortAlg);
      }

      // For now switching between transpose and unsorted
      if (this.sortAlg === "unsorted") this.sortAlg = "transposed";
      else if (this.sortAlg === "transposed") this.sortAlg = "unsorted";
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
