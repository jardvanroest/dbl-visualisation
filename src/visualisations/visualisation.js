import * as d3 from "d3";

export class Visualisation {
  constructor(HTMLSelector) {
    this.HTMLSelector = HTMLSelector;
    this.width = 500;
    this.height = 500;
    this.svg = this._createSVG();
  }

  redraw() {
    throw new Error("Redraw method should be implemented in subclass");
  }

  _resetVisualisation() {
    d3.select(this.HTMLSelector).select("svg").remove();
  }

  // TODO: the brush and link fucks up the zooming FIX IT
  _getSVG() {
    const svg = this._createSVG();
    // const zoomableSVG = this._makeZoomAndPannable(svg);
    return svg; // return zoomableSVG;
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
          .scaleExtent([1, 5])
          .on("zoom", function (event) {
            g.attr("transform", event.transform);
          })
      )
      .append("g");

    return g;
  }
}
