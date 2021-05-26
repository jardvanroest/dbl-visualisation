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
      size: 450,
      zoom_vals: { min: 3 / 4, max: 4, margin: 50 },
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
    this.zoom = d3
      .zoom()
      .scaleExtent([this.zoom_vals.min, this.zoom_vals.max])
      .on("zoom", this.zoomed);

    this.g = d3
      .select("#" + this.id)
      .attr("viewBox", "0 0 " + this.size + " " + this.size)
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
      const worldTopLeft = [
        box.x - this.zoom_vals.margin,
        box.y - this.zoom_vals.margin,
      ];
      const worldBottomRight = [
        box.x + box.width + this.zoom_vals.margin,
        box.y + box.height + this.zoom_vals.margin,
      ];
      this.zoom.translateExtent([worldTopLeft, worldBottomRight]);
      this.g.attr("transform", event.transform);
    },
  },
};
</script>
