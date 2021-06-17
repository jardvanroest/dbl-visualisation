<template>
  <div class="visualisation">
    <Spinner :show="showSpinner" offset="0.5rem" />
    <DropDown
      class="dropdown"
      :selected="type"
      :items="dropdownItems"
      @changed="changeVisualisation"
    />
    <svg class="vis-svg" :id="id"></svg>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";
import * as visualisations from "@/visualisations";
import DropDown from "@/components/DropDown.vue";
import * as d3 from "d3";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Visualisations",
  props: ["id", "initialType"],
  components: {
    Spinner,
    DropDown,
  },
  data() {
    return {
      size: 500,
      zoomVals: { min: 1 / 2, max: 5, margin: 100 },
      dropdownItems: this.createDropDownItemsList(),
      showSpinner: false,
      type: this.initialType,
    };
  },
  computed: {
    ...mapGetters("dataset", [
      "filteredEmails",
      "persons",
      "getSortedMatrixData",
    ]),
    ...mapGetters("brush_and_link", ["selectedNodes", "interactionMode"]),
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        this.spinnerFunctionality(this.redraw);
      },
    },
    selectedNodes() {
      this.showSelection();
    },
    interactionMode() {
      this.spinnerFunctionality(this.toggleInteractionMode);
    },
    // Watch for new incoming {sortedMatrixData}
    getSortedMatrixData() {
      if (this.type === "AdjacencyMatrix") {
        this.spinnerFunctionality(this.redrawForAdjacency);
      }
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
      .filter(() => this.interactionMode === "inspect") // Only zoom in Inspection Mode
      .on("zoom", this.zoomed);

    this.g = d3
      .select("#" + this.id)
      .attr("viewBox", "0 0 " + this.size + " " + this.size)
      .call(this.zoom)
      .append("g")
      .attr("transform", translation);

    this.createVisualisation(this.type);
    this.redraw();
  },
  methods: {
    createVisualisation(type) {
      let newType = type.split("-")[0];
      this.visualisation = new visualisations[newType]("#" + this.id);
    },
    changeVisualisation(type) {
      let myFunction = () => {
        this.type = type;
        this.visualisation.resetVisualisation();
        this.createVisualisation(this.type);
        this.redraw();
      };
      this.spinnerFunctionality(myFunction);
    },
    showSelection() {
      this.visualisation.showSelection(this.selectedNodes);
    },
    spinnerFunctionality(myFunction) {
      this.showSpinner = true;
      new Promise((resolve, reject) => {
        setTimeout(() => {
          myFunction();
          resolve();
        }, 0);
      }).then(() => (this.showSpinner = false));
    },
    toggleInteractionMode() {
      this.visualisation.toggleInteractionMode(this.interactionMode);
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
    redraw() {
      if (this.type === "AdjacencyMatrix") {
        this.redrawForAdjacency();
      } else {
        this.visualisation.redraw(this.filteredEmails, this.persons);
      }
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
