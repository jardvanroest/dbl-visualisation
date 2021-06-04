import * as d3 from "d3";
import { Visualisation } from "@/visualisations/visualisation.js";
import { Graph } from "@/visualisations/node-link/graph.js";
import { Simulator } from "@/visualisations/node-link/simulator.js";
import store from "@/store";

export class NodeLinkVisualisation extends Visualisation {
  constructor() {
    super("#areaNodeLinkSVG");

    this.colors = {
      edgePositive: "#b4ecb4",
      edgeNeutral: "#cfcfc4",
      edgeNegative: "#e498a1",
      nodeBody: "#b8e0f6",
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
    this._resetVisualisation();
    this._generateVis(emails);
  }

  _generateVis(emails) {
    const { nodes, links } = this._parseData(emails);
    const svg = this._getSVG();
    this._drawVisualisation(nodes, links, svg);
  }

  _parseData(emails) {
    const graph = new Graph(emails);
    const { nodes, links } = graph.parse();
    return { nodes, links };
  }

  _drawVisualisation(nodes, links, svg) {
    const simulation = this._getSimulation(nodes, links);

    this.drawnLinks = this._drawLinks(svg, links);
    this.drawnNodes = this._drawNodes(svg, nodes, simulation);

    simulation.on("tick", this._handleSimulationTick.bind(this));
  }

  _getSimulation(nodes, links) {
    const simulator = new Simulator(
      nodes,
      links,
      this.options.width,
      this.options.height
    );
    const simulation = simulator.createForceSimulation();

    return simulation;
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
      })
      .on("click", this.edgeClick.bind(this));
  }

  _drawNodes(svg, nodes, simulation) {
    return svg
      .append("g")
      .attr("stroke", this.colors.nodeOutline)
      .attr("stroke-width", this.options.nodeOutlineSize)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", this.options.nodeRadius)
      .attr("fill", this.colors.nodeBody)
      .call(this._handleMouseDragOnNode(simulation)) // Append listener for drag events
      .on("click", this.nodeClick.bind(this));
  }

  _handleMouseDragOnNode(simulation) {
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

  edgeClick(event, data) {
    console.log("Line!");
    console.log(data);
  }

  nodeClick(event, data) {
    const persons = store.getters["dataset/persons"];
    const person = persons.find((p) => p.id === data.id);

    console.log(person);
    console.log(data);

    let inspectorData = {
      person: {
        email: person.emailAddress,
        id: person.id,
        title: person.jobTitle,
        included_in_filter: person.isSelectedInEmailFilter,
      },
      sent_emails: { number: person.sendEmails.length },
      received_emails: { number: person.receivedEmails.length },
      additional_information: { node_color: this.colors.nodeBody },
    };

    // Add fields only if there are emails
    if (person.sendEmails.length > 0) {
      this._newEmailsObject(person.sendEmails, inspectorData.sent_emails);
    }
    if (person.receivedEmails.length > 0) {
      this._newEmailsObject(
        person.receivedEmails,
        inspectorData.received_emails
      );
    }

    store.dispatch("dataset/changeInspectorData", inspectorData);
  }
}
