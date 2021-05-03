<template>
  <svg :width="size" :height="size"></svg>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "AdjacencyMatrix",
  data() {
    return {
      size: 400,
    };
  },
  mounted() {
    var data = [
      { fromId: 10, toId: 20 },
      { fromId: 5, toId: 3 },
      { fromId: 24, toId: 15 },
      { fromId: 30, toId: 36 },
    ];

    var size = 400;

    var svg = d3.select("svg");

    var maxId = 36;

    var cell_size = size / (maxId + 1);

    svg
      .append("rect")
      .attr("class", "background")
      .attr("width", size)
      .attr("height", size)
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
