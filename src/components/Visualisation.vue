<template>
  <div class="visualisation" ref="vis">
    <Spinner :show="showSpinner" offset="0.5rem" />
    <DropDown
      class="dropdown"
      :selected="id"
      :items="dropdownItems"
      @changed="changeVisualisation"
    />
    <Tooltip
      :visible="tooltipVisibility"
      :data="tooltipData"
      :pos="tooltipPosition"
      @tooltipUpdate="tooltipUpdate"
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
import Tooltip from "./Tooltip.vue";

export default {
  name: "Visualisations",
  props: ["id"],
  components: {
    Spinner,
    DropDown,
    Tooltip,
  },
  data() {
    return {
      size: 500,
      zoomVals: { min: 1 / 2, max: 5, margin: 100 },
      dropdownItems: this.createDropDownItemsList(),
      showSpinner: false,
      tooltipVisibility: false,
      tooltipPosition: { top: 0, left: 0 },
      tooltipData: {},
    };
  },
  computed: {
    ...mapGetters("dataset", ["filteredEmails", "persons"]),
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        this.showSpinnerDoFunctionHideSpinner(this.redraw);
      },
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
    this.redraw();
  },
  methods: {
    createVisualisation(type) {
      this.visualisation = new visualisations[type](
        "#" + this.id,
        this.tooltipUpdate
      );
      //console.log(element.getBoundingClientRect());
    },
    changeVisualisation(type) {
      let myFunction = () => {
        this.visualisation.resetVisualisation();
        this.createVisualisation(type);
        this.redraw();
      };
      this.showSpinnerDoFunctionHideSpinner(myFunction);
    },
    showSpinnerDoFunctionHideSpinner(myFunction) {
      this.showSpinner = true;
      new Promise((resolve, reject) => {
        setTimeout(() => {
          myFunction();
          resolve();
        }, 0);
      }).then(() => (this.showSpinner = false));
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
        list.push({ value: key, name: this.visName(key) });
      }
      return list;
    },
    visName(type) {
      switch (type) {
        case "AdjacencyMatrix":
          return "Adjacency matrix";
        case "NodeLink":
          return "Node-link diagram";
        case "CalendarVisualisation":
          return "Calendar matrix";
        case "CalendarVisulasation":
          return "Calendar visualisation";
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
