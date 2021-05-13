<template>
  <rect></rect>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "TestVis",
  mounted() {
    this.generateMatrix();
  },
  props: ["id"],
  methods: {
    generateMatrix() {
      // Append the svg object to the div

      // var svg = d3.select("#" + this.id);

      var g = d3.select("#" + this.id).selectChild("g");

      const width = 200;

      g.append("rect")
        .attr("width", width)
        .attr("height", width)
        .attr("fill", "#d3d3d3");
    },
  },
};
</script>
