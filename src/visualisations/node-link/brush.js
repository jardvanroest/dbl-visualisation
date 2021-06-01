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
  }

  appendBrush() {
    const brush = this._createBrush();

    this.brushArea.append("g").call(brush);
  }

  _createBrush() {
    return d3
      .brush()
      .extent([
        [0, 0],
        [this.options.width, this.options.height],
      ]) // Sets boundaries for the brush
      .on("brush end", (event) => this._onBrushNodes(event));
  }

  // Node-specific brushing logic
  _onBrushNodes(event) {
    if (event.selection === null) {
      this.brushObjects.attr("stroke", this.colors.normal);
      this._selectedObjects = [];
      return;
    }

    const that = this;
    const [[x0, y0], [x1, y1]] = event.selection; // Get boundaries of selection

    this._selectedObjects = [];
    // Set stroke based on whether or not the element is in selection
    this.brushObjects.attr("stroke", function (d) {
      // Check if data element is selected using its coordinates
      const selected = x0 <= d.x && x1 >= d.x && y0 <= d.y && y1 >= d.y;

      if (selected) {
        that._selectedObjects.push({ id: d.id });
        return that.colors.selected;
      }

      return that.colors.normal;
    });

    // Update global varibale, so the selection can be shown in other components
    store.dispatch("brush_and_link/updateSelectedNodes", this._selectedObjects);
  }
}
