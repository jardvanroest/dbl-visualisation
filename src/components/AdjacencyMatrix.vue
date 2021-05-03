<template>
  <svg :width="width" :height="height"></svg>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "AdjacencyMatrix",
  data() {
    return {
      mynumber: 5,
      width: 400,
      height: 400,
    };
  },
  mounted() {
    var data = [
      { fromId: 10, toId: 20 },
      { fromId: 5, toId: 3 },
      { fromId: 24, toId: 15 },
      { fromId: 30, toId: 36 },
    ];

    var svg = d3.select("svg");

    var cell_size = 10;

    svg
      .append("rect")
      .attr("class", "background")
      .attr("width", 400)
      .attr("height", 400)
      .attr("fill", "green");

    data.forEach((link) => {
      svg
        .append("rect")
        .attr("class", "cell")
        .attr("width", cell_size)
        .attr("height", cell_size)
        .attr("x", link.fromId * cell_size)
        .attr("y", link.toId * cell_size)
        .attr("fill", "red");
    });
  },
};
</script>
