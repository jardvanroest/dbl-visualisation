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
  },
};
</script>
