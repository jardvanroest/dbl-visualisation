<template>
  <div class="visualisation">
    <DropDown
      class="dropdown"
      :selected="id"
      :items="dropdownItems"
      @changed="changeVisualisation"
    />
    <svg class="vis-svg" :id="id"></svg>
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
  data() {
    return {
      size: 500,
      zoomVals: { min: 1 / 2, max: 5, margin: 100 },
      dropdownItems: this.createDropDownItemsList(),
      type: "none",
    };
  },
  computed: {
    ...mapGetters("dataset", [
      "filteredEmails",
      "persons",
      "getSortedMatrixData",
    ]),
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        this.redrawAfterFiltering();
      },
    },
    // Watch for new incoming {sortedMatrixData}
    getSortedMatrixData() {
      this.redrawForAdjacency();
    },
  },
  mounted() {
    // Calculate margin for initial zoom and scale so that buttons do not cover the visualisation
    let rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let margin = 2.375 * rem;
    let marginScale = 1 - (2 * margin) / this.size;
    let translation = `translate(${margin},${margin}) scale(${marginScale},${marginScale})`;

    this.zoom = d3
      .zoom()
      .scaleExtent([this.zoomVals.min, this.zoomVals.max])
      .on("zoom", this.zoomed);

    this.g = d3
      .select("#" + this.id)
      .attr("viewBox", "0 0 " + this.size + " " + this.size)
      .call(this.zoom)
      .append("g")
      .attr("transform", translation);

    this.createVisualisation(this.id);
    this.redraw(this.persons, this.persons);
  },
  methods: {
    createVisualisation(type) {
      this.visualisation = new visualisations[type]("#" + this.id);
    },
    changeVisualisation(type) {
      this.type = type;
      this.visualisation.resetVisualisation();
      this.createVisualisation(this.type);
      this.redraw(this.persons, this.persons);
    },
    redraw(personsRows, personsCols) {
      let type = this.type;
      if (this.type == "none") type = this.id;

      if (type === "AdjacencyMatrix") {
        this.visualisation.redraw(
          this.filteredEmails,
          personsRows,
          personsCols
        );
      } else {
        this.visualisation.redraw(this.filteredEmails, this.persons);
      }
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
        list.push({ value: key, name: this.visName(key) });
      }
      return list;
    },
    redrawAfterFiltering() {
      if (this.isAdjacencyMatrix()) {
        this.redrawForAdjacency();
      } else {
        this.redraw(this.persons, this.persons);
      }
    },
    isAdjacencyMatrix() {
      return (
        this.type === "AdjacencyMatrix" ||
        (this.type = "none" && this.id === "AdjacencyMatrix")
      );
    },
    redrawForAdjacency() {
      let newData = this.getSortedMatrixData;
      if (newData === "unsorted") {
        this.visualisation.redraw(
          this.filteredEmails,
          this.persons,
          this.persons
        );
      } else {
        this.visualisation.redraw(
          this.filteredEmails,
          newData.personsRows,
          newData.personsCols
        );
      }
    },
    visName(type) {
      switch (type) {
        case "AdjacencyMatrix":
          return "Adjacency matrix";
        case "NodeLink":
          return "Node-link diagram";
        case "CalendarVisualisation":
          return "Calendar matrix";
        default:
          return "No name for vis";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.visualisation {
  position: relative;
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
  top: 1%;
  left: 1%;
}

.vis-svg {
  background-image: url("../assets/icons/tileable-hex.png");
  background-repeat: repeat;
  background-size: 6%;
  background-color: rgb(235, 235, 235);
  background-blend-mode: screen;
}
</style>
