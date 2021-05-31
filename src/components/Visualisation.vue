<template>
  <div id="area" style="padding: 30px">
    <DropDown ref="dropdown" @changed="changeVisualisation" />
    <svg :id="id"></svg>
  </div>
</template>

<script>
import * as visualisations from "@/visualisations";
import DropDown from "@/components/DropDown.vue";
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "Visualisations",
  props: ["id"],
  components: {
    DropDown,
  },
  data: function () {
    return {
      type: "AdjacencyMatrix",
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

    this.createVisualisation(this.type);
    this.generateVisualisation();
  },
  methods: {
    changeVisualisation(type) {
      this.type = type;
      this.resetVisualisation();
      this.createVisualisation(type);
      this.generateVisualisation();
    },
    resetVisualisation() {
      console.log("reset vis");
      this.visualisation.reset();
    },
    createVisualisation(type) {
      this.visualisation = new visualisations[type][type]("#" + this.id);
    },
    generateVisualisation() {
      this.visualisation.create({
        filteredEmails: this.filteredEmails,
        numberOfPersons: this.numberOfPersons,
      });
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
