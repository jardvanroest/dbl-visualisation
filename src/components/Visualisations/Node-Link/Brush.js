import * as d3 from "d3";

// ? Can this class work for other visualisations ?
// If not, add different {_onBrush} functions ?
export class Brush {
  constructor(brushArea, brushObjects, width, height, normalCol, selectedCol) {
    this.brushArea = brushArea;
    this.brushObjects = brushObjects;

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
      .on("brush end", (event) => this._onBrush(event));
  }

  _onBrush(event) {
    if (event.selection === null) {
      this.brushObjects.attr("stroke", this.colors.normal);
      return;
    }

    // TODO: change elements using CSS styles
    const that = this;
    const [[x0, y0], [x1, y1]] = event.selection; // Get boundaries of selection
    this.brushObjects.attr("stroke", function (d) {
      // Check if data element is selected using its coordinates
      const selected = x0 <= d.x && x1 >= d.x && y0 <= d.y && y1 >= d.y;

      if (selected) return that.colors.selected;
      return that.colors.normal;
    });
  }
}
