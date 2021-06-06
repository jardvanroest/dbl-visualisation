<template>
  <div class="visualisation" id="area">
    <DropDown
      class="dropdown"
      :items="dropdownItems"
      @changed="changeVisualisation"
    />
    <svg :id="id"></svg>
  </div>
</template>

<script>
import * as visualisations from "@/visualisations";
import DropDown from "@/components/DropDown.vue";
import * as d3 from "d3";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Visualisations",
  props: ["id"],
  components: {
    DropDown,
  },
  data: function () {
    return {
      type: "NodeLink",
      size: 450,
      zoomVals: { min: 3 / 4, max: 4, margin: 50 },
      dropdownItems: this.createDropDownItemsList(),
    };
  },
  computed: {
    ...mapGetters("dataset", ["filteredEmails", "persons"]),
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        this.redraw();
      },
    },
  },
  mounted() {
    this.zoom = d3
      .zoom()
      .scaleExtent([this.zoomVals.min, this.zoomVals.max])
      .on("zoom", this.zoomed);

    this.g = d3
      .select("#" + this.id)
      .attr("viewBox", "0 0 " + this.size + " " + this.size)
      .call(this.zoom)
      .append("g");

    this.createVisualisation(this.type);
    this.redraw();
  },
  methods: {
    createVisualisation(type) {
      this.visualisation = new visualisations[type](
        "#" + this.id,
        this.changeInspectorData
      );
    },
    changeVisualisation(type) {
      this.visualisation.resetVisualisation();
      this.createVisualisation(type);
      this.redraw();
    },
    redraw() {
      this.visualisation.redraw(this.filteredEmails, this.persons);
    },
    zoomed(event) {
      var box = this.g.node().getBBox();
      const topLeft = [
        box.x - this.zoomVals.margin,
        box.y - this.zoomVals.margin,
      ];
      const bottomRight = [
        box.x + box.width + this.zoomVals.margin,
        box.y + box.height + this.zoomVals.margin,
      ];
      this.zoom.translateExtent([topLeft, bottomRight]);
      this.g.attr("transform", event.transform);
    },
    createDropDownItemsList() {
      var list = [];
      for (const key of Object.keys(visualisations)) {
        list.push({ value: key, name: visualisations[key].name });
      }
      return list;
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: absolute;
}
</style>
