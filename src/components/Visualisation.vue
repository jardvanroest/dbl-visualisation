<template>
  <div class="visualisation">
    <svg class="vis-svg" :id="id"></svg>
    <VisualisationSettings
      class="vis-sett-cont"
      @apply="changeDates"
      @color_change="changeColoringMode"
      @setDateFilter="setDateFilter"
      :dates="localFilteredDates"
      :vis_id="type"
    />
    <ZoomBtns class="zoom-btns" @zoomIn="zoomIn" @zoomOut="zoomOut" />
    <Spinner :show="showSpinner" offset="0.5rem" />
    <DropDown
      class="dropdown"
      :selected="type"
      :items="dropdownItems"
      @changed="changeVisualisation"
    />
    <TimeBar
      class="timebar"
      :dates="localFilteredDates"
      :doLocalFilter="doDateFilter"
    />
    <Tooltip
      :visible="tooltipVisibility"
      :data="tooltipData"
      :pos="tooltipPosition"
      @tooltipUpdate="tooltipUpdate"
    />
  </div>
</template>

<script>
import ZoomBtns from "@/components/buttons/ZoomBtns.vue";
import Spinner from "@/components/Spinner.vue";
import DropDown from "@/components/DropDown.vue";
import TimeBar from "@/components/TimeBar.vue";
import Tooltip from "@/components/Tooltip.vue";
import VisualisationSettings from "@/components/VisualisationSettings.vue";
import * as visualisations from "@/visualisations";
import * as d3 from "d3";
import { mapGetters, mapActions } from "vuex";
import { passesDateFilter } from "@/store/modules/dataset/filtering.js";

export default {
  name: "Visualisations",
  props: ["id", "initialType"],
  components: {
    ZoomBtns,
    Spinner,
    DropDown,
    VisualisationSettings,
    TimeBar,
    Tooltip,
  },
  data() {
    return {
      type: this.initialType,
      size: 500,
      zoomVals: { min: 1 / 2, max: 5, margin: 100 },
      dropdownItems: this.createDropDownItemsList(),
      showSpinner: false,
      localFilteredDates: this.filteredDates,
      doDateFilter: false,
      tooltipVisibility: false,
      tooltipPosition: { top: 0, left: 0 },
      tooltipData: {},
      emails: this.filteredEmails,
      coloringMode: "byEmails",
    };
  },
  computed: {
    ...mapGetters("dataset", [
      "filteredEmails",
      "filteredDates",
      "persons",
      "getSortedMatrixData",
    ]),
    ...mapGetters("brush_and_link", ["selectedNodes", "interactionMode"]),
    ...mapGetters("brush_and_link", [
      "selectedNodes",
      "selectedEdges",
      "interactionMode",
    ]),
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        this.emails = this.filteredEmails;
        this.spinnerFunctionality(this.redraw);
      },
    },
    coloringMode: {
      deep: true,
      handler() {
        this.spinnerFunctionality(this.redraw);
      },
    },
    selectedNodes() {
      this.showNodeSelection();
    },
    selectedEdges() {
      this.showEdgeSelection();
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

    this.svg = d3
      .select("#" + this.id)
      .attr("viewBox", "0 0 " + this.size + " " + this.size)
      .call(this.zoom);

    this.g = this.svg.append("g").attr("transform", translation);

    this.localFilteredDates = this.filteredDates;
    this.emails = this.filteredEmails;

    this.createVisualisation(this.type);
    this.redraw();
  },
  methods: {
    createVisualisation(type) {
      let newType = type.split("-")[0];
      this.visualisation = new visualisations[newType](
        "#" + this.id,
        this.tooltipUpdate,
        this.getColoringMode
      );
    },
    toString(date) {
      return date.toISOString().split("T")[0];
    },
    setDateFilter(doFilter) {
      this.doDateFilter = doFilter;
      if (!doFilter) this.changeDates(this.filteredDates);
    },
    changeDates(dates) {
      this.localFilteredDates = dates;
      this.emails = this.filterEmails(
        this.filteredEmails,
        this.localFilteredDates
      );
      let myFunction = () => {
        this.redraw();
      };
      this.spinnerFunctionality(myFunction);
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
    filterEmails(emails, filteredDates) {
      return emails.filter((email) => {
        return passesDateFilter(email, filteredDates);
      });
    },
    showSelection() {
      this.visualisation.showSelection(this.selectedNodes);
    },
    showNodeSelection() {
      this.visualisation.onNodeSelection(this.selectedNodes);
    },
    showEdgeSelection() {
      this.visualisation.onEdgeSelection(this.selectedEdges);
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
        this.visualisation.redraw(this.emails, this.persons);
      }
    },
    redrawForAdjacency() {
      let newData = this.getSortedMatrixData;
      if (newData === "unsorted") {
        this.visualisation.redraw(this.emails, this.persons, this.persons);
      } else {
        this.visualisation.redraw(
          this.emails,
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
    tooltipUpdate(d) {
      if (d.visible) {
        this.showTooltip(d.pos, d.data);
      } else {
        this.hideTooltip();
      }
    },
    showTooltip(position, data) {
      this.tooltipPosition = position;
      this.tooltipData = data;
      this.tooltipVisibility = true;
    },
    hideTooltip() {
      this.tooltipVisibility = false;
    },
    zoomIn() {
      this.zoom.scaleBy(this.svg.transition().duration(250), 1.6);
    },
    zoomOut() {
      this.zoom.scaleBy(this.svg.transition().duration(250), 1 / 1.6);
    },
    getColoringMode() {
      return this.coloringMode;
    },
    changeColoringMode(mode) {
      this.coloringMode = mode;
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

.zoom-btns {
  position: absolute;
  bottom: calc(1% + 0.4em);
  right: 1%;
}

.dropdown {
  position: absolute;
  top: 1%;
  left: 1%;
}

.vis-sett-cont {
  z-index: 1;
  position: absolute;
  top: 1%;
  right: 1%;
}

.timebar {
  position: absolute;
  bottom: 1%;
  width: calc(100% - 0.4em);
  opacity: 0.8;
}

.vis-svg {
  background-image: url("../assets/icons/tileable-hex.png");
  background-repeat: repeat;
  background-size: 6%;
  background-color: rgb(235, 235, 235);
  background-blend-mode: screen;
}

[data-theme="dark"] {
  .vis-svg {
    background-image: url("../assets/icons/tileable-hex-dark.png");
    background-blend-mode: normal;
    filter: saturate(200%);
    filter: opacity(95%);
  }
}
</style>
