import * as d3 from "d3";

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
      .on("start", (event) => this._onBrushObjectsStart(event))
      .on("brush", (event) => this._onBrushObjects(event));
  }

  _onBrushObjects(event) {
    if (event.selection === null) return;

    const that = this;
    const [[x0, y0], [x1, y1]] = event.selection; // Get boundaries of selection

    this._selectedObjects = [];
    // Set stroke based on whether or not the element is in selection
    this.brushObjects.attr("selected", function (d) {
      // Check if data element is selected using its coordinates
      return x0 <= d.x && x1 >= d.x && y0 <= d.y && y1 >= d.y;
    });

    this.brushObjects.attr("stroke", function (d) {
      // Check if data element is selected using its coordinates
      if (this.getAttribute("selected") == "true") {
        that._selectedObjects.push(d.id);
        return that.colors.selected;
      }
      return that.colors.normal;
    });

    this._updateSelectedObjects(this._selectedObjects);
  }

  _onBrushObjectsStart(event) {
    this.brushObjects.attr("stroke", this.colors.normal);
    this._selectedObjects = [];

    this._updateSelectedObjects(this._selectedObjects);
  }

  // Update global varibale, so the selection can be shown in other components
  _updateSelectedObjects(selectedObjects) {}
}
