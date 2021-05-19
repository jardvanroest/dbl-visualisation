import * as d3 from "d3";

export class NodeLink {
  constructor() {
    this.colors = {
      edgePositive: "#b4ecb4",
      edgeNeutral: "#cfcfc4",
      edgeNegative: "#e498a1",
      nodeBody: "#B8E0F6",
      nodeOutline: "#fff",
    };

    this.options = {
      nodeRadius: 5,
      nodeOutlineSize: 1.5,
      edgeOpacity: 0.6,
      width: 500,
      height: 500,
    };
  }

  redraw(emails) {
    this.emails = emails;
    this.resetVis();
    this._generateVis();
  }

  _generateVis() {
    const { nodes, links } = this.parseData();
    const svg = this._createSVG();
    this._drawVisualisation(nodes, links, svg);
  }

  _drawVisualisation(nodes, links, svg) {
    const simulation = this._createForceSimulation(nodes, links);

    this.drawnLinks = this._drawLinks(svg, links);
    this.drawnNodes = this._drawNodes(svg, nodes, simulation);

    simulation.on("tick", this._handleSimulationTick.bind(this));
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
        if (d.avgSentiment < -0.01) return that.colors.edgeNegative;
        if (d.avgSentiment > 0.01) return that.colors.edgePositive;
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
      .call(this.drag(simulation)); // Append listener for drag events
  }

  _createForceSimulation(nodes, links) {
    return d3
      .forceSimulation(nodes)
      .force(
        "center",
        d3
          .forceCenter(this.options.width / 2, this.options.height / 2)
          .strength(0.01)
      ) // Pulls nodes to center
      .force(
        "charge",
        d3
          .forceManyBody()
          .strength(function (d, i) {
            return i == 0 ? -60 : -40;
          })
          .distanceMax([
            Math.max(this.options.width, this.options.height) * 0.8,
          ])
      ) // Nodes repel each other so they don't overlap
      .force(
        "link",
        d3.forceLink(links).id((link) => link.id)
      ) // Push elements to be a fixed distance apart
      .force("x", d3.forceX(this.options.width / 2).strength(0.1)) // Attracts elements to specified positions
      .force("y", d3.forceY(this.options.height / 2).strength(0.1));
  }

  _handleSimulationTick() {
    this.drawnLinks
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    this.drawnNodes.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  }

  _createSVG() {
    return d3
      .select("#areaNodeLinkSVG")
      .append("svg")
      .attr("viewBox", [0, 0, this.options.width, this.options.height]);
  }

  drag(simulation) {
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

  parseData() {
    const nodes = [],
      links = [];

    var emails = this.emails;

    // Maps for finding unique nodes and edges
    var nodesMap = new Map(),
      edgesCount = [];

    // Iterate through {emails} to compute {nodes} and {links}
    for (let i = 0; i < emails.length; i++) {
      let u = parseInt(emails[i]["fromId"]);
      let v = parseInt(emails[i]["toId"]);
      let sentiment = parseFloat(emails[i]["sentiment"]);

      nodesMap.set(u, { id: u });
      nodesMap.set(v, { id: v });

      // Get index of edge in {edges}
      let indexOfEdge = edgesCount.findIndex(
        (element) => element["source"] === u && element["target"] === v
      );
      // If edge does not exist
      if (indexOfEdge === -1) {
        // Push the edge
        edgesCount.push({
          source: u,
          target: v,
          index: [i],
          sentiment: [sentiment],
        });
      } else {
        // Else add new index
        edgesCount[indexOfEdge]["index"].push(i);
        edgesCount[indexOfEdge]["sentiment"].push(sentiment);
      }
    }

    // Compute {links} from {edgesCount} because Maps are stupid in JS
    for (let i = 0; i < edgesCount.length; i++) {
      links.push({
        source: edgesCount[i]["source"],
        target: edgesCount[i]["target"],
        weight: edgesCount[i]["index"].length,
        avgSentiment:
          edgesCount[i]["sentiment"].reduce((a, b) => a + b, 0) /
          edgesCount[i]["sentiment"].length,
      });
    }

    // Compute {nodes} from {nodesMap} by iterating because JS! >:(
    var temp = Array.from(nodesMap.values());
    for (let i = 0; i < temp.length; i++) nodes.push(temp[i]);

    return { nodes, links };
  }

  resetVis() {
    d3.select("#areaNodeLinkSVG").select("svg").remove();
  }
}
