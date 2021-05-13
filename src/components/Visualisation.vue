<template>
  <div id="area" style="padding: 30px">
    <svg :id="id"></svg>
  </div>
</template>

<script>
import * as visualisations from "@/visualisations";
import * as d3 from "d3";

export default {
  name: "Visualisations",
  props: ["type", "id"],
  mounted() {
    var g = d3
      .select("#" + this.id)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 450 450")
      .call(
        d3
          .zoom()
          .scaleExtent([1, 2])
          .on("zoom", function (event) {
            g.attr("transform", event.transform);
          })
      )
      .append("g");

    visualisations[this.type].create(
      "#" + this.id,
      this.$store.state.dataset.getRawData()
    );
  },
};
</script>
