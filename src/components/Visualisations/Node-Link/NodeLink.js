import * as d3 from "d3";
import { DataParser } from "./DataParser.js";
import { Simulation } from "./Simulation.js";
import { Brush } from "./Brush.js";

export class NodeLink {
  constructor() {
    this.colors = {
      edgePositive: "#b4ecb4",
      edgeNeutral: "#cfcfc4",
      edgeNegative: "#e498a1",
      nodeBody: "#B8E0F6",
      nodeOutline: "#fff",
      nodeSelectedOutline: "#A585C1",
    };

    this.options = {
      width: 500,
      height: 500,
      nodeRadius: 5,
      nodeOutlineSize: 1.5,
      edgeOpacity: 0.6,
      sentimentThreshold: 0.01,
    };

    this.brushedNodes = [];
  }

  redraw(emails) {
    this._resetVis();
    this._generateVis(emails);
  }

  _generateVis(emails) {
    const { nodes, links } = new DataParser(emails).parseData();
    const svg = this._createSVG();
    this._drawVisualisation(nodes, links, svg);
  }

  _createSVG() {
    return d3
      .select("#areaNodeLinkSVG")
      .append("svg")
      .attr("viewBox", [0, 0, this.options.width, this.options.height]);
  }

  _drawVisualisation(nodes, links, svg) {
    const simulation = new Simulation().createForceSimulation(
      nodes,
      links,
      this.options.width,
      this.options.height
    );

    this.drawnLinks = this._drawLinks(svg, links);
    this.drawnNodes = this._drawNodes(svg, nodes, simulation);

    simulation.on("tick", this._handleSimulationTick.bind(this));

    // TODO: adding the brush invalidates drag behaviour
    // new Brush(
    //   svg,
    //   this.drawnNodes,
    //   this.options.width,
    //   this.options.height,
    //   this.colors.nodeOutline,
    //   this.colors.nodeSelectedOutline
    // ).appendBrush();
  }

  _drawLinks(svg, links) {
    const that = this;

    return svg
      .append("g")
      .attr("stroke-opacity", this.options.edgeOpacity)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", function (d) {
        // Color edges based on average sentiment
        if (d.avgSentiment < -that.options.sentimentThreshold)
          return that.colors.edgeNegative;
        if (d.avgSentiment > that.options.sentimentThreshold)
          return that.colors.edgePositive;
        return that.colors.edgeNeutral;
      });
  }

  _drawNodes(svg, nodes, simulation) {
    const that = this;

    return svg
      .append("g")
      .attr("class", "node")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("stroke", that.colors.nodeOutline)
      .attr("stroke-width", this.options.nodeOutlineSize)
      .attr("r", this.options.nodeRadius)
      .attr("fill", this.colors.nodeBody)
      .call(new Simulation().drag(simulation)); // Append listener for drag events
  }

  _handleSimulationTick() {
    this.drawnLinks
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    this.drawnNodes.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  }

  _resetVis() {
    d3.select("#areaNodeLinkSVG").select("svg").remove();
  }
}
