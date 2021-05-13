import * as d3 from "d3";

export function create(svg) {
  var g = d3.select(svg).selectChild("g");

  const width = 200;

  g.append("rect")
    .attr("width", width)
    .attr("height", width)
    .attr("fill", "#d3d3d3");
}
