<template>
  <div class="visualisation">
    <DropDown
      class="dropdown"
      :selected="id"
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
      size: 500,
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

    this.createVisualisation(this.id);
    this.redraw();
  },
  methods: {
    createVisualisation(type) {
      this.visualisation = new visualisations[type]("#" + this.id);
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

<style scoped lang="scss">
.visualisation {
  --margin-size: 0.75rem;

  position: relative;
  margin: var(--margin-size);
  margin-left: 0;
  padding: 0.25rem;

  border-radius: var(--border-rad);
  background-color: var(--background-color);
  box-shadow: 0 0 0 2px var(--background-color),
    rgba(50, 50, 93, 0.25) 2px 4px 5px -1px, rgba(0, 0, 0, 0.3) 2px 3px 3px -1px;

  &:hover {
    box-shadow: 0 0 0 2px var(--accent-color),
      rgba(50, 50, 93, 0.25) 2px 4px 5px -1px,
      rgba(0, 0, 0, 0.3) 2px 3px 3px -1px;
  }
}

.dropdown {
  position: absolute;
}
</style>
