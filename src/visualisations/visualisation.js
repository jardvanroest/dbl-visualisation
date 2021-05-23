import * as d3 from "d3";

export class Visualisation {
  constructor(HTMLSelector, width, height) {
    this.HTMLSelector = HTMLSelector;
    this.width = width;
    this.height = height;
    this.svg = this._createSVG();
    // this.svg = this._makeZoomAndPannable(this.svg);
  }

  redraw() {
    throw new Error("Redraw method should be implemented in subclass");
  }

  _getSVG() {
    const svg = this._createSVG();
    const zoomableSVG = this._makeZoomAndPannable(svg);
    return zoomableSVG;
  }

  _createSVG() {
    return d3
      .select(this.HTMLSelector)
      .append("svg")
      .attr("viewBox", [0, 0, this.width, this.height]);
  }

  _makeZoomAndPannable(svg) {
    const g = svg
      .call(
        d3
          .zoom()
          .scaleExtent([1, 3])
          .on("zoom", function (event) {
            g.attr("transform", event.transform);
          })
      )
      .append("g");

    return g;
  }
}
