<template>
  <div style="text-align: center">
    <h1>Adjacency Matrix</h1>
    <div id="area"></div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "AdjacencyMatrix",
  mounted() {
    var edges = [
      [1, 10],
      [2, 3],
      [4, 7],
      [6, 4],
      [1, 3],
      [1, 8],
      [9, 10],
      [10, 9],
      [5, 8],
    ];

    // Set needed variables
    var width = 450,
      height = 450,
      rectMargin = 2;
    var nodes = 10;
    var rectLen = width / nodes - rectMargin * nodes * 0.5; // TODO: fix this black magic

    // Colors
    var edgeCol = "#DEC4D6";
    var normalCol = "#B8E0F6";

    // Append the svg object to the div
    var svg = d3
      .select("#area")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

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

    // Populate {data} matrix based on {edges} content
    for (let i = 0; i < edges.length; i++) {
      var u = edges[i][0];
      var v = edges[i][1];

      data[u][v] = edgeCol;
    }

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
        if (Number.isInteger(d)) return "none";
        else return d.toString();
      });
  },
};
</script>
