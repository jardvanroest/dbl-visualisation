<template>
  <div class="container">
    <div style="text-align: center">
      <div id="area" style="padding: 30px">
        <svg :id="id" viewBox="0 0 450 450">
          <g>
            <AdjacencyMatrix :id="id" v-if="type === 'adjacencymatrix'" />
            <TestVis :id="id" v-if="type === 'testvis'" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import AdjacencyMatrix from "@/components/AdjacencyMatrix.vue";
import TestVis from "@/components/TestVis.vue";
import * as d3 from "d3";

export default {
  name: "Visualisations",
  props: ["type", "id"],
  components: {
    AdjacencyMatrix,
    TestVis,
  },
  mounted() {
    console.log("." + this.id);

    var g = d3
      .select("#" + this.id)
      .call(
        d3
          .zoom()
          .scaleExtent([1, 2])
          .on("zoom", function (event) {
            g.attr("transform", event.transform);
          })
      )
      .selectChild("g");
  },
};
</script>
