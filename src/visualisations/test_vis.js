import * as d3 from "d3";

export class TestVis {
  constructor(selector) {
    this.selector = selector;
  }
  create() {
    var g = d3.select(this.selector).selectChild("g");

    const width = 200;

    g.append("rect")
      .attr("width", width)
      .attr("height", width)
      .attr("fill", "#d3d3d3");
  }
  reset() {
    d3.select(this.selector).remove();
  }
}
