<template>
  <div id="area" style="padding: 30px">
    <svg :id="id"></svg>
  </div>
</template>

<script>
import * as visualisations from "@/visualisations";
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "Visualisations",
  props: ["type", "id"],
  data: function () {
    return {
      visualisation: new visualisations[this.type][this.type]("#" + this.id),
    };
  },
  computed: {
    ...mapGetters("dataset", ["filteredEmails", "numberOfPersons"]),
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        this.resetVisualisation();
        this.generateVisualisation();
      },
    },
  },
  mounted() {
    this.zoom = d3.zoom().scaleExtent([1, 2]).on("zoom", this.zoomed);

    this.g = d3
      .select("#" + this.id)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 450 450")
      .call(this.zoom)
      .append("g");

    this.generateVisualisation();
  },
  methods: {
    generateVisualisation() {
      this.visualisation.create({
        filteredEmails: this.filteredEmails,
        numberOfPersons: this.numberOfPersons,
      });
    },
    resetVisualisation() {
      this.visualisation.reset();
    },
    zoomed(event) {
      var box = this.g.node().getBBox();
      const margin = 100;
      const worldTopLeft = [box.x - margin, box.y - margin];
      const worldBottomRight = [
        box.x + box.width + margin,
        box.y + box.height + margin,
      ];
      this.zoom.translateExtent([worldTopLeft, worldBottomRight]);
      this.g.attr("transform", event.transform);
    },
  },
};
</script>
