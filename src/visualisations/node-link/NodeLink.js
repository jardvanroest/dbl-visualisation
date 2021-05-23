import * as d3 from "d3";
import { DataParser } from "./DataParser.js";
import { Visualisation } from "@/visualisations/visualisation.js";

export class NodeLink extends Visualisation {
  constructor() {
    super("#areaNodeLinkSVG", 500, 500);

    this.colors = {
      edgePositive: "#b4ecb4",
      edgeNeutral: "#cfcfc4",
      edgeNegative: "#e498a1",
      nodeBody: "#B8E0F6",
      nodeOutline: "#fff",
    };

    this.options = {
      width: 500,
      height: 500,
      nodeRadius: 5,
      nodeOutlineSize: 1.5,
      edgeOpacity: 0.6,
      sentimentThreshold: 0.01,
    };
  }

  redraw(emails) {
    this._resetVis();
    this._generateVis(emails);
  }

  _generateVis(emails) {
    const { nodes, links } = new DataParser(emails).parseData();
    const svg = this._getSVG();
    this._drawVisualisation(nodes, links, svg);
  }

  _drawVisualisation(nodes, links, svg) {
    const simulation = this._createForceSimulation(nodes, links);

    this.drawnLinks = this._drawLinks(svg, links);
    this.drawnNodes = this._drawNodes(svg, nodes, simulation);

    simulation.on("tick", this._handleSimulationTick.bind(this));
  }

  _createForceSimulation(nodes, links) {
    let simulation = d3.forceSimulation(nodes);

    simulation = this._addCenteringForce(simulation);
    simulation = this._addChargeForce(simulation);
    simulation = this._addLinkForce(simulation, links);
    simulation = this._addXYForces(simulation);

    return simulation;
  }

  // Add force that pulls nodes to center
  _addCenteringForce(simulation) {
    return simulation.force(
      "center",
      d3
        .forceCenter(this.options.width / 2, this.options.height / 2)
        .strength(0.01)
    );
  }

  // Add force that makes nodes repel each other so they don't overlap
  _addChargeForce(simulation) {
    return simulation.force(
      "charge",
      d3
        .forceManyBody()
        .strength(function (d, i) {
          return i == 0 ? -60 : -40;
        })
        .distanceMax([Math.max(this.options.width, this.options.height) * 0.8])
    );
  }

  // Add force that pushes elements to be a fixed distance apart
  _addLinkForce(simulation, links) {
    return simulation.force(
      "link",
      d3.forceLink(links).id((link) => link.id)
    );
  }

  // Add force that attracts elements to specified positions
  _addXYForces(simulation) {
    return simulation
      .force("x", d3.forceX(this.options.width / 2).strength(0.1))
      .force("y", d3.forceY(this.options.height / 2).strength(0.1));
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
    return svg
      .append("g")
      .attr("stroke", this.colors.nodeOutline)
      .attr("stroke-this.options.width", this.options.nodeOutlineSize)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", this.options.nodeRadius)
      .attr("fill", this.colors.nodeBody)
      .call(this._drag(simulation)); // Append listener for drag events
  }

  _drag(simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
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
