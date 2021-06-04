import * as d3 from "d3";

export class Visualisation {
  constructor(HTMLSelector, name) {
    this.HTMLSelector = HTMLSelector;
    this.name = name;
    this.width = 500;
    this.height = 500;
    this.svg = this._getSVG();
  }

  redraw() {
    throw new Error("Redraw method should be implemented in subclass");
  }

  resetVisualisation() {
    d3.select(this.HTMLSelector).selectChild("g").selectAll("*").remove();
  }

  _getSVG() {
    return d3.select(this.HTMLSelector).selectChild("g");
  }
}
