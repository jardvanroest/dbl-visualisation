<template>
  <div style="text-align: center">
    <div id="area" style="padding: 30px"></div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "TestVis",
  mounted() {
    this.generateMatrix();
  },
  methods: {
    generateMatrix() {
      // Append the svg object to the div
      var svg = d3
        .select("#area")
        .append("svg")
        .call(
          d3
            .zoom()
            .scaleExtent([1, 2])
            .on("zoom", function (event) {
              svg.attr("transform", event.transform);
            })
        )
        .attr("viewBox", "0 0 450 450")
        .append("g");

      const width = 200;

      svg
        .append("rect")
        .attr("width", width)
        .attr("height", width)
        .attr("fill", "#d3d3d3");
    },
  },
};
</script>
