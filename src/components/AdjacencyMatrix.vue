<template>
  <div style="text-align: center">
    <h1>Adjacency Matrix</h1>
    <br />
    <div id="area" style="padding: 30px"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "AdjacencyMatrix",
  computed: {
    ...mapGetters(["filteredEmails", "numberOfPersons"]),
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        d3.select("svg").remove();
        this.generateMatrix();
      },
    },
  },
  mounted() {
    this.generateMatrix();
  },
  methods: {
    generateMatrix() {
      // Colors
      const edgeCol = "#DF848F";
      const normalCol = "#B8E0F6";

      const nodes = this.numberOfPersons;
      const edges = this.filteredEmails;

      console.log("Redraw");

      // Append the svg object to the div
      const svg = d3
        .select("#area")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet") // TODO: sizing is weird because of this ?
        .attr("viewBox", "0 0 450 450")
        .classed("svg-content", true);

      // Set size variables
      const width = 426, // TODO: resizing shouldn't be hard coded in (might be fine tho)
        rectLen = width / (nodes + 2),
        rectMargin = rectLen * 0.06;

      /* Create {data} matrix of size [nodes + 1][nodes + 1]
       * data[i][j] = edgesCol - edge [i, j] exists
       * data[i][j] = normalCol - edge [i, j] does not exist
       * data[i][j] is an integer - first row and column
       */
      var data = [];
      data.push(d3.range(0, nodes + 1)); // First row contains the nodes indices
      for (let i = 1; i <= nodes; i++) {
        var temp = new Array(nodes + 1).fill(normalCol);
        temp[0] = i; // First column contains the nodes indices

        data.push(temp);
      }

      console.log("Start population");
      // Populate {data} matrix based on {edges} content
      for (let i = 0; i < edges.length; i++) {
        let u = edges[i].fromId;
        let v = edges[i].toId;

        data[u][v] = edgeCol;
      }
      console.log("End population");

      console.log("Start rowgroup creation");
      // Create a group for each row so it can be translated vertically
      var rowGrp = svg
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
          // d - data element; i - index element
          return "translate(0, " + (rectLen + rectMargin) * i + ")";
        });

      console.log("Start adding rectangles");
      // Add rectangles for each row group and color accordingly
      rowGrp
        .selectAll("g")
        .data(function (d) {
          return d;
        })
        .enter()
        .append("g")
        .append("rect")
        .attr("x", function (d, i) {
          return (rectLen + rectMargin) * i;
        })
        .attr("width", rectLen)
        .attr("height", rectLen)
        .attr("fill", function (d) {
          // Color based on {data} matrix
          if (Number.isInteger(d)) return "#d3d3d3";
          // TODO: add node labels?
          else return d.toString();
        });
      console.log("End");
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
