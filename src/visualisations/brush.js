import * as d3 from "d3";
import store from "@/store";

// ? Can this class work for other visualisations ?
// If not, add different {_onBrush} functions ?
export class Brush {
  constructor(brushArea, brushObjects, width, height, normalCol, selectedCol) {
    this.brushArea = brushArea;
    this.brushObjects = brushObjects;
    this._selectedObjects = [];

    this.colors = {
      selected: selectedCol,
      normal: normalCol,
    };

    this.options = {
      width: width,
      height: height,
    };

    console.log(brushObjects);
    this.brush = this._createBrush();
  }

  appendBrush() {
    this.brushArea.append("g").attr("class", "brush").call(this.brush);
  }

  removeBrush() {
    this.brushArea.selectAll("g.brush").remove();
  }

  _createBrush() {
    return d3
      .brush()
      .extent([
        [0, 0],
        [this.options.width, this.options.height],
      ]) // Sets boundaries for the brush
      .on("start", (event) => this._onBrushNodesStart(event))
      .on("brush", (event) => this._onBrushNodes(event));
  }

  // Node-specific brushing logic
  _onBrushNodes(event) {
    if (event.selection === null) return;

    const that = this;
    const [[x0, y0], [x1, y1]] = event.selection; // Get boundaries of selection

    this._selectedObjects = [];
    // Set stroke based on whether or not the element is in selection
    this.brushObjects.attr("stroke", function (d) {
      // Check if data element is selected using its coordinates
      const x = d.x,
        y = d.y;

      const selected = x0 <= x && x1 >= x && y0 <= y && y1 >= y;
      if (selected) {
        that._selectedObjects.push(d.id);
        return that.colors.selected;
      }

      return that.colors.normal;
    });

    // Update global varibale, so the selection can be shown in other components
    store.dispatch("brush_and_link/updateSelectedNodes", this._selectedObjects);
  }

  _onBrushNodesStart(event) {
    this.brushObjects.attr("stroke", this.colors.normal);
    this._selectedObjects = [];

    // Update global varibale, so the selection can be shown in other components
    store.dispatch("brush_and_link/updateSelectedNodes", this._selectedObjects);
  }
}
