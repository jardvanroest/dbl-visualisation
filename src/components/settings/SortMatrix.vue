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

      // NOT REALLY WORKING RIGHT NOW
      // CuthillMckee algorithm made by (c) 2015 Mikola Lysenko. MIT
      // https://github.com/mikolalysenko/cuthill-mckee
      // let coeffs = this.getCoefficients();
      // let perm = this.cuthillMckee(coeffs, coeffs.length);
      // let permutedData = this.permuteMatrix(data, perm, perm);

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
    swapArrayElements(arr, el1, el2) {
      let temp = arr[el1];
      arr[el1] = arr[el2];
      arr[el2] = temp;

      return arr;
    },
    compareNum(a, b) {
      return a - b;
    },
    cuthillMckee(list, n) {
      var adj = new Array(n);
      var visited = new Array(n);
      for (let i = 0; i < n; ++i) {
        adj[i] = [];
        visited[i] = false;
      }

      for (let i = 0; i < list.length; ++i) {
        var l = list[i];
        adj[l[0]].push(l[1]);
      }

      var toVisit = new Array(n);
      var eol = 0;
      var ptr = 0;
      for (let i = 0; i < n; ++i) {
        if (visited[i]) {
          continue;
        }
        toVisit[eol++] = i;
        visited[i] = true;
        while (ptr < eol) {
          var v = toVisit[ptr++];
          var nbhd = adj[v];
          nbhd.sort(this.compareNum);
          for (var j = 0; j < nbhd.length; ++j) {
            var u = nbhd[j];
            if (visited[u]) {
              continue;
            }
            visited[u] = true;
            toVisit[eol++] = u;
          }
        }
      }

      var result = new Array(n);
      for (let i = 0; i < n; ++i) {
        result[toVisit[i]] = i;
      }

      return result;
    },
  },
};
</script>
